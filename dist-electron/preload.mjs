"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  },
  updateSubViewUrl: (url) => electron.ipcRenderer.invoke("update-subview-url", url)
});
electron.contextBridge.exposeInMainWorld("api", {
  onItemAdd: (callback) => {
    electron.ipcRenderer.on("item-add", (_, item) => {
      callback(item);
    });
  },
  selectDownloadPath: () => electron.ipcRenderer.invoke("select-download-path"),
  getDownloadDir: () => electron.ipcRenderer.invoke("get-download-dir"),
  getRobotsChecked: () => electron.ipcRenderer.invoke("get-robots-checked"),
  setRobotsChecked: (value) => electron.ipcRenderer.invoke("set-robots-checked", value),
  openFolder: (filepath) => electron.ipcRenderer.invoke("open-existing-folder", filepath),
  copyText: (text) => electron.ipcRenderer.invoke("copy-text", text)
});
electron.contextBridge.exposeInMainWorld("layoutAPI", {
  setShellWidth: (width) => electron.ipcRenderer.send("shell-width-changed", width),
  resizeWindow: (width) => electron.ipcRenderer.invoke("resize-window", width)
});
