import { app, BrowserWindow, WebContentsView, ipcMain, dialog, shell, clipboard, } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import { settingsStore } from './store';

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

const TARGET_URL = "https://example.com";


let currentDownloadUrl: string = '';

function getDownloadRootDir(): string {
  let settingDir = settingsStore.get('downloadPath');
  if (settingDir == null || settingDir.trim() == '') {
    const downloadPath = app.getPath('downloads');
    console.log(downloadPath)
    return downloadPath;
  }
  ensureDir(settingDir);
  return settingDir;
}

function getDomainDir(url: string) {
  let downloadHostname = '';
  if (currentDownloadUrl != '') {
    downloadHostname = new URL(currentDownloadUrl).hostname;
  }
  let hostname = '';
  if (url != '') {
    hostname = new URL(url).hostname;
  }

  const dir = path.join(getDownloadRootDir(), 'webdownloader', downloadHostname, hostname);
  ensureDir(dir);
  return dir;
}

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function getMime(response: any): string {
  return (
    response.mimeType ||
    response.headers?.["content-type"] ||
    "application/octet-stream"
  );
}


let subView: WebContentsView
let mainWin: BrowserWindow


function createWindow() {

  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'icon.png'),
    title: 'QCSiteDownloader',
    width: 1420,
    height: 680,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  })
  mainWin = win

  /* -------- BrowserView A -------- */
  const viewA = new WebContentsView()
  win.contentView.addChildView(viewA)
  viewA.webContents.loadURL(TARGET_URL)
  viewA.setBounds({ x: 0, y: 0, width: 1000, height: 800 })

  // 1️⃣ 拦截 window.open / target=_blank
  viewA.webContents.setWindowOpenHandler(({ url }) => {
    // 直接在当前页面跳转
    viewA.webContents.loadURL(url)
    return { action: 'deny' } // 阻止新窗口
  })

  // 2️⃣ 拦截导航事件（可选，防止 link + target="_top" 打开外部浏览器）
  viewA.webContents.on('will-navigate', (event, url) => {
    // 如果要限制只在当前页面跳转
    event.preventDefault()
    viewA.webContents.loadURL(url)
  })

  win.contentView.addChildView(viewA)
  subView = viewA
  ensureDir(getDownloadRootDir());

  const wc = viewA.webContents;
  const client = wc.debugger;
  client.attach("1.3");

  client.sendCommand("Network.enable", {
    maxTotalBufferSize: 100 * 1024 * 1024,
    maxResourceBufferSize: 50 * 1024 * 1024,
  });

  client.sendCommand("Page.enable");

  // 资源抓取（JS / CSS / IMG / XHR / HTML 子资源）
  const requestMap = new Map();
  client.on("message", async (_event, method, params) => {

    if (method === "Network.requestWillBeSent") {
      requestMap.set(params.requestId, params.request.url);
      return;
    }



    if (method == "Network.loadingFailed") {
      const requestUrl: string = requestMap.get(params.requestId);
      requestMap.delete(params.requestId);

      win?.webContents.send('item-add', {
        "url": requestUrl,
        "filepath": "",
        'isSuccess': false,
      })

      return;
    }

    if (currentDownloadUrl == '' || currentDownloadUrl == TARGET_URL || currentDownloadUrl == 'localhost') {
      return;
    }

    if (method !== "Network.responseReceived") return;

    const { requestId, response } = params;
    const url = response.url;

    if (!url.startsWith("http")) return;

    if (response.status >= 400) {
      win?.webContents.send('item-add', {
        "url": url,
        "filepath": "",
        'isSuccess': false,
      })
      return
    }

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

      win?.webContents.send('item-add', {
        "url": url,
        "filepath": filePath,
        'isSuccess': true,
      })
    } catch {
      // streaming / ws / large media ignore
    }
  });


  // Test active push message to Renderer-process.
  viewA.webContents.on('did-finish-load', async () => {

    if (win == undefined || win == null) {
      console.error("Window is not defined, cannot save HTML.");
      return
    }

    try {
      const htmlstr = await viewA.webContents.executeJavaScript(
        "document.documentElement.outerHTML"
      );

      if (win == undefined || win == null) {
        console.error("Window is not defined, cannot save HTML.");
        return
      }

      const domainDir = getDomainDir(win.webContents.getURL());
      const htmlPath = path.join(domainDir, "index.html");

      fs.writeFileSync(htmlPath, htmlstr, "utf-8");
      win.webContents.send('item-add', {
        "url": viewA.webContents.getURL(),
        "filepath": htmlPath,
        "isSuccess": true,
      })

      // 给 XHR 留时间
      setTimeout(() => {
        console.log("Capture complete, exiting.");
      }, 15000);

    } catch (err) {
      console.error("HTML capture failed:", err);
    }


  })

  win.on("resize", () => {
    applyLayout()
  })

  viewA.webContents.on("did-finish-load", () => {
    applyLayout()
  })

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
    currentDownloadUrl = url;
    console.log("Updating subView URL to:", url)
    subView.webContents.loadURL(url)
  }
})

ipcMain.handle('select-download-path', async () => {
  const result = await dialog.showOpenDialog({
    title: '选择下载文件夹',
    defaultPath: getDownloadRootDir(),
    properties: ['openDirectory', 'createDirectory']
  })

  settingsStore.set('downloadPath', result.canceled ?
    getDownloadRootDir() : result.filePaths[0]);

  return result
})

ipcMain.handle('get-download-dir', () => {
  return getDownloadRootDir();
})

ipcMain.handle('copy-text', (_, text: string) => {
  clipboard.writeText(text);
})

ipcMain.handle('set-robots-checked', (_, value: boolean) => {
  settingsStore.set('checkRobots', value);
})

ipcMain.handle('get-robots-checked', () => {
  return settingsStore.get('checkRobots');
})

let shellWidth = 480   // 左侧 Shell 当前宽度（px）

function applyLayout() {
  const { width, height } = mainWin.getContentBounds()
  subView.setBounds({
    x: 0,
    y: 0,
    width: width - shellWidth - 6,
    height
  })
}

ipcMain.on("shell-width-changed", (_, width) => {
  shellWidth = width
  console.log("Shell width changed:", shellWidth)
  applyLayout()
})

ipcMain.handle('resize-window', (_, width) => {
  const h = mainWin.getBounds().height;
  mainWin.setSize(Math.ceil(width), h);
});

// 通过 IPC 打开文件夹
ipcMain.handle('open-existing-folder', async (_, filepath: string) => {
  try {
    const result = await shell.openPath(filepath);
    // openPath 返回空字符串表示成功
    if (result === '') return true
    return false
  } catch (err) {
    console.error(err)
    return false
  }
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

app.whenReady().then(() => {
  createWindow();
});
