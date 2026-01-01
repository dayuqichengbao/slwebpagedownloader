export { }

declare global {
    interface Window {
        electronAPI: {
            updateSubViewUrl: (url: string) => Promise<void>
        },
        api: {
            onItemAdd: (callback: (item: any) => void) => void,
            selectDownloadPath: () => Promise<void>
        }
    }
}
