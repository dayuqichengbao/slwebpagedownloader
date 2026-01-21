/// <reference types="vite/client" />

export {};

declare global {
  interface Window {
    electronAPI: {
      updateSubViewUrl: (url: string) => Promise<any>;
    };
    api: {
      onItemAdd: (callback: (item: any) => void) => void;
      selectDownloadPath: () => Promise<{ canceled: boolean; filePaths: string[] }>;
      getDownloadDir: () => Promise<string>;
      getRobotsChecked: () => Promise<boolean>;
      setRobotsChecked: (value: boolean) => Promise<void>;
      openFolder: (filepath: string) => Promise<boolean>;
      copyText: (text: string) => Promise<void>;
    };
    layoutAPI: {
      setShellWidth: (width: number) => void;
      resizeWindow: (width: number) => Promise<void>;
    };
  }
}
