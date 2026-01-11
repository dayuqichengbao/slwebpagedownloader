<template>

  <div class="app-container" ref="containerRef">

    <div class="web-panel">
    </div>
    <div class="divider" @mousedown="onMouseDown"></div>

    <!-- 右侧：操作区 -->
    <div class="flex flex-col justify-end bg-[#F5F5F7] p-1 font-sf h-full" ref="box"
      :style="{ width: rightWidth + 'px' }">

      <div id="url-input-section" class="p-3 border-b border-[#D1D1D6]">
        <label class="block text-[12px] font-medium text-[#86868B] mb-2 uppercase tracking-wide">Website URL</label>
        <div class="flex gap-3">
          <input type="text" placeholder="https://www.example.com" v-model="url"
            class="mac-input flex-1 px-2 py-1.5 border border-[#D1D1D6] rounded-lg text-[12px] text-[#1D1D1F] focus:border-[#007AFF]">
          <button @click="handleDownload"
            class="mac-button bg-[#007AFF] text-white px-4 py-1.5 rounded-lg text-[12px] font-medium hover:bg-[#0051D5] active:bg-[#004FC4]">
            Download
          </button>
        </div>
      </div>

      <div id="save-location-section" class="p-3 border-b border-[#D1D1D6]">
        <label class="block text-[12px] font-medium text-[#86868B] mb-2 uppercase tracking-wide">Save Location</label>
        <div class="flex gap-3">
          <input v-model="downloadPath" placeholder="请选择下载保存路径" readonly
            class="mac-input flex-1 px-2 py-1.5 border border-[#D1D1D6] rounded-lg text-[12px] text-[#1D1D1F] focus:border-[#007AFF] bg-[#F5F5F7]" />
          <button @click="choosePath"
            class="mac-button bg-white border border-[#D1D1D6] text-[#1D1D1F] px-4 py-1.5 rounded-lg text-[12px] font-medium hover:bg-gray-50 active:bg-gray-100">
            Choose Folder
          </button>
          <button @click="handleOpenFolder"
            class="mac-button bg-[#007AFF] text-white px-4 py-1.5 rounded-lg text-[12px] font-medium hover:bg-[#0051D5] active:bg-[#004FC4]">
            Open Folder
          </button>
        </div>
      </div>

      <div id="options-section" class="p-3 border-b border-[#D1D1D6] flex flex-row gap-3">

        <div class="text-[10px] text-[#86868B]">
          Files Downloaded: <span class="font-medium text-[#1D1D1F]">{{ list.length }}</span>
        </div>
        <div class="text-[10px] text-[#86868B]">
          Fail Downloaded: <span class="font-medium text-[#1D1D1F]">{{ failCount }}</span>
        </div>
      </div>

      <div class="p-3  border-[#D1D1D6] rounded-lg flex-1">
        <div class="border border-[#D1D1D6] rounded-lg flex flex-col h-96" ref="listContainerRef">
          <div class="bg-[#F5F5F7] px-4 py-2 border-b border-[#D1D1D6] rounded-tr-lg rounded-tl-lg shrink-0"
            ref="listHeaderRef">
            <div class="grid grid-cols-12 gap-3 text-[12px] font-medium text-[#86868B] uppercase tracking-wide">
              <div class="col-span-2">Status</div>
              <div class="col-span-7">Path</div>
              <div class="col-span-3 text-right">Actions</div>
            </div>
          </div>
          <!--list列表--->
          <div class="overflow-y-auto h-96" ref="listBodyRef">
            <template v-for="item in list">
              <div class="mac-table-row grid grid-cols-12 gap-3 px-4 py-3 border-b border-[#D1D1D6] items-center">
                <div class="col-span-2">

                  <span v-if="item.isSuccess"
                    class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    success
                  </span>

                  <span v-else class=" px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    failed
                  </span>


                </div>
                <div class="col-span-7 text-sm text-[#1D1D1F] truncate">{{ item.url }}</div>
                <div class="col-span-3 flex gap-2 justify-end">
                  <button class="text-[#007AFF] text-xs font-medium hover:underline"
                    @click="openSubFolder(item.filepath)">Open</button>
                  <button class="text-[#007AFF] text-xs font-medium hover:underline"
                    @click="copy(item.url)">Copy</button>
                </div>
              </div>
            </template>
          </div>
        </div>

      </div>


    </div>


  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, onUnmounted, nextTick, computed } from 'vue'

const url = ref('')
const robotsChecked = ref(true)
const downloadPath = ref('')

//Download按钮点击，打印日志
function handleDownload() {
  list.value = []  // 清空列表
  window.electronAPI.updateSubViewUrl(url.value)
}

const handleOpenFolder = async () => {
  const success = await window.api.openFolder(downloadPath.value)
  if (!success) {
    alert('打开失败，请检查路径是否正确')
  }
}

const copy = async (text) => {
  window.api.copyText(text)
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

const successCount = computed(() =>
  list.value.filter(item => item.isSuccess).length
)

const failCount = computed(() =>
  list.value.filter(item => !item.isSuccess).length
)

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
const rightWidth = ref(470);  // 初始宽度

const MIN_RIGHT_WIDTH = 470;
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

const listContainerRef = ref(null);
const listHeaderRef = ref(null);
const listBodyRef = ref(null);

const bodyHeight = ref(0)

const calcHeight = () => {
  const containerH = listContainerRef.value.offsetHeight
  const headerH = listHeaderRef.value.offsetHeight

  bodyHeight.value = containerH - headerH
  console.log('containerH', containerH, 'headerH', headerH, 'bodyHeight', bodyHeight.value)
}

onMounted(async () => {
  await nextTick()
  calcHeight()
})


</script>

<style scoped>
/* 整体布局 */
.app-container {
  display: flex;
  height: 100vh;
  width: 100wh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI";
  display: flex;
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


.mac-input {
  transition: all 0.15s ease;
}

.mac-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.15);
}

.mac-button {
  transition: all 0.15s ease;
}

.mac-button:hover {
  transform: translateY(-1px);
}

.mac-button:active {
  transform: translateY(0);
}

.mac-table-row {
  transition: background-color 0.1s ease;
}

.mac-table-row:hover {
  background-color: rgba(0, 0, 0, 0.02);
}
</style>
