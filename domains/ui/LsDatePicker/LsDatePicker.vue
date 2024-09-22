<template>
  <v-date-picker class="ls-date-picker" v-model="currentDate" />
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  date: string | Date | null
}>()

const emit = defineEmits<{
  (e: 'update:date', v: string | Date | null): void
}>()

const currentDate = useVModel(props, 'date', emit)
</script>

<style src="./LsDatePicker.scss"></style>
