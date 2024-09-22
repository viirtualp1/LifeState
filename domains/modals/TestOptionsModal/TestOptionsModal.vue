<template>
  <ls-modal
    v-model="currentModelValue"
    class="test-options-modal"
    :max-width="360"
  >
    <template #title> Выберите дату </template>

    <ls-date-picker v-model:date="currentDate" />

    <div class="test-options-modal__date">
      Выбранная дата: <strong>{{ selectedDate }}</strong>
    </div>

    <ls-button theme="accent" :to="testLink">Далее</ls-button>
  </ls-modal>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { format, formatISO } from 'date-fns'
import { LsModal, LsDatePicker, LsButton } from '@/domains/ui'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:model-value', v: boolean): void
}>()

const router = useRouter()

const currentModelValue = useVModel(props, 'modelValue', emit)
const currentDate = ref<string | Date>(new Date())

const selectedDate = computed(() => {
  return format(currentDate.value, 'dd.MM.yyyy')
})

const testLink = computed(() => {
  const parsedDate = formatISO(currentDate.value)

  return router.resolve({
    name: 'test',
    query: {
      date: parsedDate,
    },
  }).href
})
</script>

<style lang="scss" src="./TestOptionsModal.scss"></style>
