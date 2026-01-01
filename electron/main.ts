import { app, BrowserWindow, WebContentsView, ipcMain, dialog } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import os from 'os'
import remoteMain from '@electron/remote/main'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

const TARGET_URL = "https://baidu.com";
const OUTPUT_ROOT = path.join(__dirname, "output");

function getMime(response: any): string {
  return (
    response.mimeType ||
    response.headers?.["content-type"] ||
    "application/octet-stream"
  );
}

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}
remoteMain.initialize()

function getDomainDir(url: string) {
  const { hostname } = new URL(url);
  const dir = path.join(OUTPUT_ROOT, hostname);
  ensureDir(dir);
  return dir;
}

let subView: WebContentsView
let mainWin: BrowserWindow

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    title: 'QCSiteDownloader',
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  })
  mainWin = win


  remoteMain.enable(win.webContents) // 启用 remote

  /* -------- BrowserView A -------- */
  const viewA = new WebContentsView()
  win.contentView.addChildView(viewA)
  viewA.webContents.loadURL(TARGET_URL)
  viewA.setBounds({ x: 0, y: 0, width: 400, height: 800 })
  win.contentView.addChildView(viewA)
  subView = viewA
  ensureDir(OUTPUT_ROOT);

  const wc = viewA.webContents;
  const client = wc.debugger;
  client.attach("1.3");

  client.sendCommand("Network.enable", {
    maxTotalBufferSize: 100 * 1024 * 1024,
    maxResourceBufferSize: 50 * 1024 * 1024,
  });

  client.sendCommand("Page.enable");

  // 资源抓取（JS / CSS / IMG / XHR / HTML 子资源）

  client.on("message", async (_event, method, params) => {
    if (method !== "Network.responseReceived") return;

    const { requestId, response } = params;
    const url = response.url;

    if (!url.startsWith("http")) return;

    try {
      const body = await client.sendCommand(
        "Network.getResponseBody",
        { requestId }
      );

      const buffer = body.base64Encoded
        ? Buffer.from(body.body, "base64")
        : Buffer.from(body.body);

      const mime = getMime(response);


      // 新内容，生成路径
      const domainDir = getDomainDir(url);

      // 按 URL path 还原目录结构（不是 flat）
      const u = new URL(url);
      let filePath = path.join(domainDir, u.pathname);

      if (filePath.endsWith("/")) {
        filePath += "index";
      }

      // 确保有扩展名
      if (!path.extname(filePath)) {
        const ext =
          mime.includes("html") ? ".html" :
            mime.includes("javascript") ? ".js" :
              mime.includes("css") ? ".css" :
                mime.includes("json") ? ".json" :
                  mime.includes("text") ? ".text" :
                    mime.includes("webp") ? ".webp" :
                      "";


        filePath += ext;
      }

      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, buffer);

      win?.webContents.send('item-add', url)
    } catch {
      // streaming / ws / large media ignore
    }
  });


  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    // win?.webContents.send('main-process-message', (new Date).toLocaleString())

    if (win == undefined || win == null) {
      return
    }

    try {
      win.webContents.executeJavaScript(
        "document.documentElement.outerHTML"
      ).then((html: string) => {
        if (win == undefined || win == null) {
          return
        }
        const domainDir = getDomainDir(win.webContents.getURL());
        const htmlPath = path.join(domainDir, "index.html");

        fs.writeFileSync(htmlPath, html, "utf-8");
        console.log("Saved HTML:", htmlPath);
        win.webContents.send('item-add', htmlPath)
      })


    } catch (err) {
      console.error("HTML capture failed:", err);
    }

    // ⭐ 关键：给 XHR 留时间
    setTimeout(() => {
      console.log("Capture complete, exiting.");
    }, 15000);
  })

  win.on("resize", () => {
    applyLayout()
  })

  viewA.webContents.on("did-finish-load", () => {
    applyLayout()
  })

  // ⭐ 默认打开 DevTools
  // win.webContents.openDevTools();

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

/**
 * 监听 Vue 发来的 URL 更新请求
 */
ipcMain.handle('update-subview-url', (_, url) => {
  if (subView && url) {
    subView.webContents.loadURL(url)
  }
})

ipcMain.handle('select-download-path', async () => {
  const defaultDir =
    os.platform() === 'win32'
      ? 'C:\\Users\\Public\\Downloads'
      : '/Users/Shared/Downloads'

  const result = await dialog.showOpenDialog({
    title: '选择下载文件夹',
    defaultPath: defaultDir,
    properties: ['openDirectory', 'createDirectory']
  })

  return result
})

let shellWidth = 470   // 左侧 Shell 当前宽度（px）

function applyLayout() {
  const { width, height } = mainWin.getContentBounds()

  subView.setBounds({
    x: 0,
    y: 0,
    width: width - shellWidth,
    height
  })
}


ipcMain.on("set-shell-width", (_, newWidth) => {
  const { width } = mainWin.getContentBounds()

  shellWidth = Math.max(
    200,
    Math.min(newWidth, width - 300) // 给 viewA 留最小宽度
  )

  applyLayout()
})


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
