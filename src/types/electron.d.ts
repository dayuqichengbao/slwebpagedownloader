export {}

declare global {
  interface Window {
    electronAPI: {
      updateSubViewUrl: (url: string) => Promise<void>
    }
  }
}
