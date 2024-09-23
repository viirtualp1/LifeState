<template>
  <div class="home-page content">
    <div class="container">
      <h1>Оценка состояния</h1>

      <div class="home-page__description">
        Этот сайт - автоматизация тестирования на основе системы Дэвида Бернса,
        взятая из книги: <br />
        <strong>
          "Терапия беспокойства. Как справляться со страхами, тревогами и
          паническими атаками без лекарств."
        </strong>
      </div>

      <div class="home-page__options">
        <ls-button theme="accent" :to="testLink">
          Пройти тест

          <template #append> Сегодняшняя дата </template>
        </ls-button>

        <ls-button theme="secondary" @click="open">
          Пройти тест

          <template #append> Другая дата </template>
        </ls-button>
      </div>

      <h2 class="home-page__results-title">Результаты</h2>

      <div v-if="results.length > 0" class="home-page__results">
        <state-card
          v-for="(result, resultIdx) in results"
          :key="resultIdx"
          :date="result.date"
          :data="JSON.parse(result.data)"
        />
      </div>
    </div>
  </div>

  <test-options-modal v-model="isOpen" />
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import type { TestStorageData } from '@/types/state'
import { LsButton, useLsModal } from '@/domains/ui'
import { TestOptionsModal } from '@/domains/modals'
import { StateCard } from '@/domains/state'

const results = useLocalStorage<TestStorageData[]>('tests', [])
const { isOpen, open } = useLsModal()
const router = useRouter()

const testLink = computed(() => {
  return router.resolve({
    name: 'test',
  }).href
})
</script>

<style src="./HomePage.scss"></style>
