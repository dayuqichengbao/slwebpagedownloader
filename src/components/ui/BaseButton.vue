<template>
  <button 
    :class="[
      'cursor-pointer rounded-lg font-medium transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-1',
      variantClasses[variant],
      sizeClasses[size],
      block ? 'w-full' : '',
      $attrs.class
    ]"
    v-bind="$attrs"
  >
    <span v-if="icon" class="mr-2 inline-block">
      <!-- Slot for icon or can be passed as prop later if using an icon library component -->
      <component :is="icon" class="w-4 h-4" />
    </span>
    <slot />
  </button>
</template>

<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

withDefaults(defineProps<{
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  icon?: any;
}>(), {
  variant: 'primary',
  size: 'md',
  block: false,
});

const variantClasses = {
  primary: 'bg-primary text-text-inverse hover:bg-primary-hover focus:ring-primary/50 border border-transparent shadow-sm',
  secondary: 'bg-surface-panel text-text-main border border-border hover:bg-gray-50 focus:ring-gray-200',
  ghost: 'bg-transparent text-text-main hover:bg-gray-100 border border-transparent',
  danger: 'bg-danger text-text-inverse hover:bg-red-600 focus:ring-danger/50 shadow-sm'
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base'
};
</script>
