import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 引入 Inter 字体
import "@fontsource/inter/400.css"; // Regular
import "@fontsource/inter/700.css"; // Bold

createApp(App).mount('#app').$nextTick(() => {
  // Use contextBridge
  // window.ipcRenderer.on('main-process-message', (_event, message) => {
  //   console.log(message)
  // })
})
