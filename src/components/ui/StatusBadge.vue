<template>
  <span :class="[
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
    statusClasses[status]
  ]">
    {{ label || status }}
  </span>
</template>

<script setup lang="ts">
type StatusType = 'success' | 'failed' | 'pending';

withDefaults(defineProps<{
  status: StatusType;
  label?: string;
}>(), {
  status: 'pending'
});

const statusClasses: Record<StatusType, string> = {
  success: 'bg-green-100 text-green-800 border border-green-200',
  failed: 'bg-red-100 text-red-800 border border-red-200',
  pending: 'bg-gray-100 text-gray-800 border border-gray-200'
};
</script>
