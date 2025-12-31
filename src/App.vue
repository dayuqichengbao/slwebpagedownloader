<template>
  <div class="app-container">

    <!-- 右侧：操作区 -->
    <div class="control-panel">
      <!-- 顶部工具栏 -->
      <div class="toolbar">
        <div class="tool-item" v-for="item in tools" :key="item">
          {{ item }}
        </div>
      </div>

      <!-- URL 输入 -->
      <div class="url-input">
        <input type="text" placeholder="https://www.example.com" v-model="url" />
        <button class="primary-btn" @click="handleDownload">Download</button>
      </div>

      <!-- 统计信息 -->
      <div class="stats">
        <div class="stat-item">Level: 0</div>
        <div class="stat-item">Files Downloaded: 0</div>
        <div class="stat-item">Files Remaining: 0</div>
        <div class="stat-item">Errors: 0</div>
      </div>

      <!-- 下载列表 -->
      <div class="table">
        <div class="table-header">
          <span>Status</span>
          <span>URL or Path</span>
          <span>Skip</span>
        </div>

        <div class="table-row" v-for="i in 6" :key="i">
          <span class="status idle">Idle</span>
          <span class="path">—</span>
          <span class="skip">✕</span>
        </div>
      </div>

      <!-- 底部进度 -->
      <div class="footer">
        <div class="progress-info">
          Progress: 0% | Files Downloaded: 0 / 0 | Errors: 0
        </div>
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const url = ref('https://www.baidu.com')

const tools = [
  'History',
  'Settings',
  'Queue',
  'Log',
  'File',
  'Folder',
  'Download',
  'Next',
  'Pause',
  'Stop'
]

//Download按钮点击，打印日志
function handleDownload() {
  window.electronAPI.updateSubViewUrl("https://www.xiaohongshu.com/explore?language=zh-CN")
}

</script>

<style scoped>
/* 整体布局 */
.app-container {
  display: flex;
  height: 100vh;
  background: #f5f7fa;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI";
}

/* 左侧网页区 */
.web-panel {
  flex: 1;
  background: #fff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
}

.browser-bar {
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  border-bottom: 1px solid #e5e7eb;
}

.window-controls {
  display: flex;
  gap: 6px;
  margin-right: 12px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.red {
  background: #ff5f56;
}

.yellow {
  background: #ffbd2e;
}

.green {
  background: #27c93f;
}

.address-bar {
  background: #f1f3f5;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 13px;
  color: #555;
  display: flex;
  align-items: center;
  gap: 6px;
}

.webview {
  flex: 1;
  width: 100%;
}

/* 右侧控制区 */
.control-panel {
  width: 420px;
  background: #fbfcfe;
  display: flex;
  flex-direction: column;
  padding: 12px;
}

/* 工具栏 */
.toolbar {
  display: flex;
  gap: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 13px;
  color: #6b7280;
}

/* URL 输入区 */
.url-input {
  display: flex;
  gap: 10px;
  margin: 14px 0;
}

.url-input input {
  flex: 1;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 14px;
}

.primary-btn {
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0 16px;
  font-size: 14px;
  cursor: pointer;
}

.primary-btn:hover {
  background: #2563eb;
}

/* 统计区 */
.stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px 12px;
  font-size: 13px;
  color: #374151;
  margin-bottom: 10px;
}

/* 表格 */
.table {
  flex: 1;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 80px 1fr 40px;
  padding: 8px 10px;
  font-size: 13px;
  align-items: center;
}

.table-header {
  background: #f9fafb;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
}

.table-row {
  border-bottom: 1px solid #f1f5f9;
  color: #4b5563;
}

.status.idle {
  color: #9ca3af;
}

.skip {
  cursor: pointer;
  color: #9ca3af;
}

/* 底部 */
.footer {
  margin-top: 10px;
  font-size: 12px;
  color: #6b7280;
}

.progress-bar {
  margin-top: 6px;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  width: 0%;
  height: 100%;
  background: #3b82f6;
}
</style>
