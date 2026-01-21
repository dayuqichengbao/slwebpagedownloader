<template>
  <div class="flex h-screen w-screen font-sans overflow-hidden" ref="containerRef">
    <!-- Left Panel (Web View) -->
    <div class="flex-1 border-r border-border flex flex-col min-w-0 bg-white">
      <slot name="left" />
    </div>

    <!-- Draggable Divider -->
    <div 
      class="w-[6px] cursor-col-resize bg-border hover:bg-primary/50 transition-colors shrink-0 z-10"
      @mousedown="onMouseDown"
    ></div>

    <!-- Right Panel (Controls) -->
    <div 
      class="flex flex-col bg-surface-bg shrink-0 h-full overflow-hidden shadow-xl z-0" 
      :style="{ width: rightWidth + 'px' }"
    >
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';

const props = withDefaults(defineProps<{
  initialWidth?: number;
  minWidth?: number;
}>(), {
  initialWidth: 470,
  minWidth: 470
});

const containerRef = ref<HTMLElement | null>(null);
const rightWidth = ref(props.initialWidth);
const DIVIDER_WIDTH = 6;
let dragging = false;

const onMouseDown = () => {
  dragging = true;
  document.body.style.cursor = 'col-resize';
  document.body.style.userSelect = 'none';

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
};

const onMouseMove = (e: MouseEvent) => {
  if (!dragging || !containerRef.value) return;

  const rect = containerRef.value.getBoundingClientRect();
  
  // Calculate right width: Container Right Edge - Mouse X - Divider Width
  let newRightWidth = rect.right - e.clientX - DIVIDER_WIDTH;
  
  if (newRightWidth < props.minWidth) newRightWidth = props.minWidth;
  
  // Window resizing logic (kept from original App.vue to maintain behavior)
  const requiredTotalWidth = newRightWidth + DIVIDER_WIDTH + 100; // +100 buffer
  const currentWindowWidth = window.innerWidth;

  if (currentWindowWidth < requiredTotalWidth && (window as any).layoutAPI) {
     (window as any).layoutAPI.resizeWindow(requiredTotalWidth);
  }

  rightWidth.value = newRightWidth;
  
  if ((window as any).layoutAPI) {
    (window as any).layoutAPI.setShellWidth(newRightWidth);
  }
};

const onMouseUp = () => {
  dragging = false;
  document.body.style.cursor = '';
  document.body.style.userSelect = '';

  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
};

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
});
</script>
