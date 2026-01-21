<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" class="text-xs font-semibold uppercase tracking-wider text-text-muted">
      {{ label }}
    </label>
    <div class="relative">
      <input
        :value="modelValue"
        :placeholder="placeholder"
        :readonly="readonly"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :class="[
          'w-full rounded-lg border bg-surface-panel px-3 py-2 text-sm text-text-main transition-all duration-200',
          'placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20',
          error ? 'border-danger focus:border-danger focus:ring-danger/20' : 'border-border focus:border-primary',
          readonly ? 'bg-surface-bg cursor-default' : ''
        ]"
        v-bind="$attrs"
      />
    </div>
    <span v-if="error" class="text-xs text-danger">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
  modelValue: string;
  placeholder?: string;
  readonly?: boolean;
  error?: string;
}>();

defineEmits(['update:modelValue']);
</script>
