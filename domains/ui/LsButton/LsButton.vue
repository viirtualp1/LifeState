<template>
  <component :is="component" class="ls-button" :class="buttonClasses" :to="to">
    <div class="ls-button__body">
      <slot />
    </div>

    <span v-if="$slots.append" class="ls-button__append">
      <slot name="append" />
    </span>
  </component>
</template>

<script setup lang="ts">
const props = defineProps<{
  theme: 'accent' | 'secondary'
  to?: string
}>()

const component = computed(() => {
  return props.to ? 'router-link' : 'button'
})

const buttonClasses = computed(() => {
  return `is-${props.theme}`
})
</script>

<style src="./LsButton.scss"></style>
