<template>
  <v-card class="state-card">
    <v-card-title>Тест за {{ formattedDate }}</v-card-title>
  </v-card>
</template>

<script setup lang="ts">
import { format, formatISO } from 'date-fns'
import type { TestData } from '@/types/state'

const props = defineProps<{
  date: string
  data: TestData
}>()

const formattedDate = computed(() => {
  return format(props.date, 'dd.MM.yyyy')
})
</script>

<style src="./StateCard.scss"></style>
