<template>

  <div class="app-container" ref="containerRef">
    <!-- 左侧：网页区 -->
    <div class="web-panel">
    </div>

    <div class="divider" @mousedown="onMouseDown"></div>

    <!-- 右侧：操作区 -->
    <div class="control-panel" ref="box" :style="{ width: rightWidth + 'px' }">
      <!-- 顶部工具栏 -->
      <!-- <div class="toolbar">
        <div class="tool-item" v-for="item in tools" :key="item">
          {{ item }}
        </div>
      </div> -->
      <!-- URL 输入 -->
      <div class="url-input">
        <input type="text" placeholder="https://www.example.com" v-model="url" />
        <button class="primary-btn" @click="handleDownload">Download</button>
      </div>

      <div class="url-input">
        <input type="text" v-model="downloadPath" placeholder="请选择下载保存路径" readonly />
        <button class="primary-btn" @click="choosePath">保存位置</button>

      </div>

      <div class="settings">
        <input type="checkbox" id="check-robots" v-model="robotsChecked" @change="onCheck($event)" />
        <label for="check-robots">检查robots.txt</label>
      </div>

      <!-- 统计信息 -->
      <div class="stats">
        <div class="stat-item">Files Downloaded: {{ list.length }}</div>
      </div>

      <!-- 下载列表 -->
      <div class="table">
        <div class="table-header">
          <span>Status</span>
          <span>URL or Path</span>
          <button class="operate-btn" @click="openFolder">Open</button>
        </div>

        <div class="table-row" v-for="item in list">
          <span class="path">success</span>
          <span class="path middle">{{ item.url }}</span>
          <div>
            <button class="operate-btn" @click="openSubFolder(item.filepath)">Open</button>
            <button class="operate-btn" @click="copy(item.url)">Copy</button>
          </div>

        </div>


      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, onUnmounted } from 'vue'

const url = ref('')
const robotsChecked = ref(true)
const downloadPath = ref('')

//Download按钮点击，打印日志
function handleDownload() {
  list.value = []  // 清空列表
  window.electronAPI.updateSubViewUrl(url.value)
}

const openFolder = async () => {
  const success = await window.api.openFolder(downloadPath.value)
  if (!success) {
    alert('打开失败，请检查路径是否正确')
  }
}

const copy = async (text) => {
  console.log('copy', text)
  window.api.copyText(text)
  alert('已复制到剪贴板')
}

const openSubFolder = async (filepath) => {
  const dir = filepath.replace(/[/\\][^/\\]+$/, '')
  const success = await window.api.openFolder(dir)
  if (!success) {
    alert('打开失败，请检查路径是否正确')
  }
}

let resizeObserver
let lastWidth = 0
const box = ref(null)

const list = ref([])

onMounted(() => {
  window.api.onItemAdd((item) => {
    // 关键：只追加增量
    list.value.unshift(item)
  })

  const width = Math.floor(box.value.offsetWidth)
  window.layoutAPI.setShellWidth(width)

  window.api.getRobotsChecked().then((checked) => {
    robotsChecked.value = checked
  })
})


function onCheck(event) {
  const target = event.target;
  robotsChecked.value = target.checked;
  window.api.setRobotsChecked(robotsChecked.value);
}

window.api.getDownloadDir().then((dir) => {
  downloadPath.value = dir
})

async function choosePath() {
  const result = await window.api.selectDownloadPath()
  if (!result.canceled && result.filePaths.length > 0) {
    downloadPath.value = result.filePaths[0] // 回显到页面
  }
}

const containerRef = ref(null);
const rightWidth = ref(400);  // 初始宽度

const MIN_RIGHT_WIDTH = 400;
const DIVIDER_WIDTH = 6;

let dragging = false;

const onMouseDown = () => {
  dragging = true;
  document.body.style.cursor = 'col-resize';
  document.body.style.userSelect = 'none';

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
};

const onMouseMove = (e) => {
  if (!dragging) return;


  const rect = containerRef.value.getBoundingClientRect();

  // 计算右侧宽度 = 容器右边缘 - 鼠标 X - divider
  let newRightWidth = rect.right - e.clientX - DIVIDER_WIDTH;
  if (newRightWidth < MIN_RIGHT_WIDTH) newRightWidth = MIN_RIGHT_WIDTH;

  const requiredTotalWidth =
    newRightWidth + DIVIDER_WIDTH + 100;

  // 当前窗口宽度
  const currentWindowWidth = window.innerWidth;

  // 不够就拉伸 Electron 窗口
  if (currentWindowWidth < requiredTotalWidth) {
    window.layoutAPI.resizeWindow(
      requiredTotalWidth
    );
  } else {
    console.log('no need to resize window');
  }

  rightWidth.value = newRightWidth;
  window.layoutAPI.setShellWidth(newRightWidth)
};

const onMouseUp = () => {
  dragging = false;
  document.body.style.cursor = '';
  document.body.style.userSelect = '';

  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
};

onUnmounted(onMouseUp);

</script>

<style scoped>


/* 整体布局 */
.app-container {
  display: flex;
  height: 100vh;
  width: 100wh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI";
}

/* 左侧网页区 */
.web-panel {
  flex: 1;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
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

.divider {
  width: 6px;
  cursor: col-resize;
  background: #ddd;
}

/* 右侧控制区 */
.control-panel {
  width: 470px;
  /* background: red; */
  display: flex;
  flex-direction: column;
  padding: 12px;
  justify-content: flex-end;
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

.operate-btn {
  background: #e5e7eb;
  color: #374151;
  border: none;
  border-radius: 6px;
  padding: 0 12px;
  font-size: 13px;
  cursor: pointer;
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
  overflow-y: auto;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 80px 1fr 80px;
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

.table-row .middle {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 0;
  /* 非常重要，防止 Grid 子项撑开 */
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
