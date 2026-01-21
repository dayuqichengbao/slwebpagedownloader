<template>
  <MainLayout :initialWidth="470" :minWidth="470">
    <template #left>
      <!-- Web View Placeholder / Injection Point -->
      <div class="h-full w-full bg-white"></div>
    </template>
    
    <template #right>
      <ControlPanel
        v-model="url"
        :path="downloadPath"
        :successCount="successCount"
        :failCount="failCount"
        @download="handleDownload"
        @choose-path="choosePath"
        @open-folder="handleOpenFolder"
      >
        <template #list>
          <DownloadList 
            :list="list" 
            @open-folder="openSubFolder"
            @copy-url="copyDetail"
          />
        </template>
      </ControlPanel>
    </template>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import MainLayout from './components/layout/MainLayout.vue';
import ControlPanel from './components/feature/ControlPanel.vue';
import DownloadList from './components/feature/DownloadList.vue';

// State
const url = ref('');
const downloadPath = ref('');
const list = ref<any[]>([]);
const robotsChecked = ref(true);

// Computed
const successCount = computed(() => list.value.filter(item => item.isSuccess).length);
const failCount = computed(() => list.value.filter(item => !item.isSuccess).length);

// Actions
function handleDownload() {
  list.value = []; // Clear list
  if (window.electronAPI) {
    window.electronAPI.updateSubViewUrl(url.value);
  }
}

async function handleOpenFolder() {
  if (window.api) {
    const success = await window.api.openFolder(downloadPath.value);
    if (!success) alert('Failed to open folder, please check path.');
  }
}

async function choosePath() {
  if ((window as any).api) {
    const result = await (window as any).api.selectDownloadPath()
    if (!result.canceled && result.filePaths.length > 0) {
      downloadPath.value = result.filePaths[0] // 回显到页面
    }
  }
}

async function openSubFolder(filepath: string) {
  const dir = filepath.replace(/[/\\][^/\\]+$/, '');
  if (window.api) {
    const success = await window.api.openFolder(dir);
    if (!success) alert('Failed to open folder.');
  }
}

async function copyDetail(text: string) {
  if (window.api) {
    window.api.copyText(text);
  }
}

// Global Event Listeners & Init
onMounted(async () => {
  if (window.api) {
    // Listen for new items
    window.api.onItemAdd((item: any) => {
      list.value.unshift(item);
    });

    // Get initial robots check state
    const checked = await window.api.getRobotsChecked();
    robotsChecked.value = checked;

    // Get default download dir
    const dir = await window.api.getDownloadDir();
    downloadPath.value = dir;
  }
});
</script>
