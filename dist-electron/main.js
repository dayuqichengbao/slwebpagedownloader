import { ipcMain, app, BrowserWindow, WebContentsView } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
createRequire(import.meta.url);
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname$1, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
const TARGET_URL = "https://baidu.com";
const OUTPUT_ROOT = path.join(__dirname$1, "output");
function getMime(response) {
  var _a;
  return response.mimeType || ((_a = response.headers) == null ? void 0 : _a["content-type"]) || "application/octet-stream";
}
function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}
function getDomainDir(url) {
  const { hostname } = new URL(url);
  const dir = path.join(OUTPUT_ROOT, hostname);
  ensureDir(dir);
  return dir;
}
let subView;
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs"),
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  const viewA = new WebContentsView();
  win.contentView.addChildView(viewA);
  viewA.webContents.loadURL(TARGET_URL);
  viewA.setBounds({ x: 0, y: 0, width: 400, height: 800 });
  win.contentView.addChildView(viewA);
  subView = viewA;
  ensureDir(OUTPUT_ROOT);
  const wc = viewA.webContents;
  const client = wc.debugger;
  client.attach("1.3");
  client.sendCommand("Network.enable", {
    maxTotalBufferSize: 100 * 1024 * 1024,
    maxResourceBufferSize: 50 * 1024 * 1024
  });
  client.sendCommand("Page.enable");
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
      const buffer = body.base64Encoded ? Buffer.from(body.body, "base64") : Buffer.from(body.body);
      const mime = getMime(response);
      console.log("###new url", url);
      const domainDir = getDomainDir(url);
      const u = new URL(url);
      let filePath = path.join(domainDir, u.pathname);
      if (filePath.endsWith("/")) {
        filePath += "index";
      }
      if (!path.extname(filePath)) {
        const ext = mime.includes("html") ? ".html" : mime.includes("javascript") ? ".js" : mime.includes("css") ? ".css" : mime.includes("json") ? ".json" : mime.includes("text") ? ".text" : mime.includes("webp") ? ".webp" : "";
        filePath += ext;
      }
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, buffer);
      console.log("Saved:", url);
    } catch {
    }
  });
  win.webContents.on("did-finish-load", () => {
    if (win == void 0 || win == null) {
      return;
    }
    try {
      win.webContents.executeJavaScript(
        "document.documentElement.outerHTML"
      ).then((html) => {
        if (win == void 0 || win == null) {
          return;
        }
        const domainDir = getDomainDir(win.webContents.getURL());
        const htmlPath = path.join(domainDir, "index.html");
        fs.writeFileSync(htmlPath, html, "utf-8");
        console.log("Saved HTML:", htmlPath);
      });
    } catch (err) {
      console.error("HTML capture failed:", err);
    }
    setTimeout(() => {
      console.log("Capture complete, exiting.");
    }, 15e3);
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
ipcMain.handle("update-subview-url", (_, url) => {
  if (subView && url) {
    subView.webContents.loadURL(url);
  }
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
