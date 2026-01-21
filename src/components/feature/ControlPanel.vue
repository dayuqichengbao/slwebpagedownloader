<template>
  <div class="flex flex-col h-full bg-surface-bg p-2 font-sans border-l border-border">
    <!-- URL Section -->
    <div class="p-4 border-b border-border">
      <div class="flex gap-2 items-end">
        <BaseInput 
          label="Website URL" 
          v-model="url" 
          placeholder="https://www.example.com" 
          class="flex-1"
        />
        <BaseButton 
          variant="primary" 
          @click="$emit('download')"
          class="mb-[1px]"
        >
          Download
        </BaseButton>
      </div>
    </div>

    <!-- Save Location Section -->
    <div class="p-4 border-b border-border">
      <div class="flex gap-2 items-end">
        <BaseInput 
          label="Save Location" 
          :modelValue="path" 
          placeholder="Select download path" 
          readonly 
          class="flex-1"
        />
        <BaseButton variant="secondary" @click="$emit('choose-path')">
          Choose
        </BaseButton>
        <BaseButton variant="primary" @click="$emit('open-folder')">
          Open
        </BaseButton>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="p-4 border-b border-border flex gap-4 text-xs text-text-muted">
      <div>
        Files Downloaded: <span class="font-medium text-text-main">{{ successCount }}</span>
      </div>
      <div>
        Failed: <span class="font-medium text-text-main">{{ failCount }}</span>
      </div>
    </div>

    <!-- List Component -->
    <div class="flex-1 p-4 min-h-0 flex flex-col">
      <slot name="list" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseInput from '../ui/BaseInput.vue';
import BaseButton from '../ui/BaseButton.vue';

const props = defineProps<{
  modelValue: string; // URL
  path: string;
  successCount: number;
  failCount: number;
}>();

const emit = defineEmits(['update:modelValue', 'choose-path', 'open-folder', 'download']);

const url = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});
</script>
