/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬─┬ dist
     * │ │ └── index.html
     * │ │
     * │ ├─┬ dist-electron
     * │ │ ├── main.js
     * │ │ └── preload.js
     * │
     * ```
     */
    APP_ROOT: string
    /** /dist/ or /public/ */
    VITE_PUBLIC: string
  }
}

// Used in Renderer process, expose in `preload.ts`
interface Window {
  ipcRenderer: import('electron').IpcRenderer,
  electronAPI: {
    updateSubViewUrl: (url: string) => Promise<void>
  },
  api: {
    onItemAdd: (callback: (item: any) => void) => void,
    selectDownloadPath: () => Promise<void>,
    getDownloadDir: () => Promise<string>,
    copyText: (text: string) => void,
    getRobotsChecked: () => Promise<boolean>,
    setRobotsChecked: (value: boolean) => Promise<void>,
    openFolder: (filepath:string) => Promise<boolean>,
  },
  layoutAPI: {
    setShellWidth: (width: number) => void
  }
}
