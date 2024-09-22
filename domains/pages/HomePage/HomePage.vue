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

      <h2 class="home-page__results">Результаты</h2>
    </div>
  </div>

  <test-options-modal v-model="isOpen" />
</template>

<script setup lang="ts">
import { formatISO } from 'date-fns'
import { LsButton, useLsModal } from '@/domains/ui'
import { TestOptionsModal } from '@/domains/modals'

const { isOpen, open } = useLsModal()
const router = useRouter()

const testLink = computed(() => {
  const date = new Date()
  const parsedDate = formatISO(date)

  return router.resolve({
    name: 'test',
    query: {
      date: parsedDate,
    },
  }).href
})
</script>

<style src="./HomePage.scss"></style>
