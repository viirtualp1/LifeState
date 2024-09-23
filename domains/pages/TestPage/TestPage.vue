<template>
  <div class="test-page">
    <test-card :states="testToShow.states" :date="date" @set:score="setScore">
      <template #title>{{ testToShow.title }}</template>

      <template #actions>
        <ls-button
          class="test-page__button"
          theme="secondary"
          @click="onPrevButtonClick"
        >
          {{ prevButtonText }}
        </ls-button>
        <ls-button
          class="test-page__button"
          theme="accent"
          @click="onNextButtonClick"
        >
          {{ nextButtonText }}
        </ls-button>
      </template>
    </test-card>
  </div>
</template>

<script setup lang="ts">
import { formatISO } from 'date-fns'
import { useLocalStorage } from '@vueuse/core'
import { tests } from '@/utils/state'
import type { ScoreType, TestStorageData } from '@/types/state'
import { TestCard } from '@/domains/test'
import { LsButton } from '@/domains/ui'

const data = useLocalStorage<TestStorageData[]>('tests', [])
const route = useRoute()
const router = useRouter()

const currentTestIndex = ref(0)
const currentTest = ref(tests[0])

const testToShow = computed(() => {
  return tests[currentTestIndex.value]
})

const date = computed(() => {
  return String(route.query.date || '') || formatISO(new Date())
})

const isFirstTest = computed(() => {
  return currentTestIndex.value === 0
})

const isLastTest = computed(() => {
  return currentTestIndex.value === tests.length - 1
})

const prevButtonText = computed(() => {
  return isFirstTest.value ? 'На главную' : 'Назад'
})

const nextButtonText = computed(() => {
  return isLastTest.value ? 'Сохранить' : 'Далее'
})

function onPrevButtonClick() {
  if (isFirstTest.value) {
    router.push('/')

    return
  }

  prevTest()
}

function onNextButtonClick() {
  if (isLastTest.value) {
    saveResults()

    return
  }

  nextTest()
}

function prevTest() {
  if (currentTestIndex.value === 0) {
    return
  }

  currentTestIndex.value--
}

function nextTest() {
  if (currentTestIndex.value === tests.length - 1) {
    return
  }

  currentTestIndex.value++
}

function setScore(data: { index: number; score: ScoreType }) {
  currentTest.value.states[data.index].score = data.score
}

function saveResults() {
  data.value.push({
    date: date.value,
    data: JSON.stringify(tests),
  })
}
</script>

<style src="./TestPage.scss"></style>
