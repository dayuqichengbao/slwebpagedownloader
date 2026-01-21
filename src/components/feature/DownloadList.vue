<template>
  <div class="flex flex-col flex-1 min-h-0 border border-border rounded-lg bg-surface-panel overflow-hidden">
    <!-- Header -->
    <div class="grid grid-cols-12 gap-3 px-4 py-2 bg-surface-bg border-b border-border text-xs font-semibold text-text-muted uppercase tracking-wider">
      <div class="col-span-2">Status</div>
      <div class="col-span-7">URL / Path</div>
      <div class="col-span-3 text-right">Actions</div>
    </div>

    <!-- List Body -->
    <div class="flex-1 overflow-y-auto">
      <template v-if="list.length > 0">
        <div 
          v-for="(item, index) in list" 
          :key="index"
          class="grid grid-cols-12 gap-3 px-4 py-3 border-b border-border items-center hover:bg-surface-bg/50 transition-colors duration-150"
        >
          <div class="col-span-2">
            <StatusBadge :status="item.isSuccess ? 'success' : 'failed'" />
          </div>
          <div class="col-span-7 text-sm text-text-main truncate" :title="item.url">
            {{ item.url }}
          </div>
          <div class="col-span-3 flex gap-2 justify-end">
            <button 
              class="text-xs font-medium text-primary hover:text-primary-hover hover:underline"
              @click="$emit('open-folder', item.filepath)"
            >
              Open
            </button>
            <button 
              class="text-xs font-medium text-primary hover:text-primary-hover hover:underline"
              @click="$emit('copy-url', item.url)"
            >
              Copy
            </button>
          </div>
        </div>
      </template>
      
      <!-- Empty State -->
      <div v-else class="flex flex-col items-center justify-center h-full text-text-muted p-8">
        <span class="text-4xl mb-2">📥</span>
        <p class="text-sm">No downloads yet</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StatusBadge from '../ui/StatusBadge.vue';

defineProps<{
  list: Array<{
    url: string;
    isSuccess: boolean;
    filepath: string;
  }>;
}>();

defineEmits(['open-folder', 'copy-url']);
</script>
