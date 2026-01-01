import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('electronAPI', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  updateSubViewUrl: (url: string) => ipcRenderer.invoke('update-subview-url', url)
})


contextBridge.exposeInMainWorld('api', {
  onItemAdd: (callback: (item: any) => void) => {
    ipcRenderer.on('item-add', (_, item) => {
      callback(item)
    })
  },
  selectDownloadPath: () => ipcRenderer.invoke('select-download-path')
})


contextBridge.exposeInMainWorld("layoutAPI", {
  setShellWidth: (width: number) => ipcRenderer.send("set-shell-width", width)
})
