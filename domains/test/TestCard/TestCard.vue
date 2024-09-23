<template>
  <v-card class="test-card" :elevation="0">
    <v-card-title class="test-card__header">
      <div class="test-card__title">
        {{ title }}
      </div>

      <div class="test-card__date">
        {{ formattedDate }}
      </div>
    </v-card-title>

    <v-divider />

    <v-card-text>
      <v-col
        v-for="(state, stateIdx) in states"
        :key="stateIdx"
        class="test-card__state"
        cols="12"
      >
        <v-select
          :items="items"
          :label="state.name"
          :hint="getStateHint(state.name)"
          persistent-hint
          item-title="name"
          item-value="value"
          variant="outlined"
          hide-details="auto"
          @update:model-value="(v) => setAnswer(stateIdx, v)"
        />
      </v-col>
    </v-card-text>

    <v-card-actions v-if="$slots.actions" class="test-card__actions">
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { type StateEntity, ScoreType } from '@/types/state'

const props = defineProps<{
  title: string
  states: StateEntity[]
  date: string | Date
}>()

const emit = defineEmits<{
  (e: 'set:score', data: { index: number; score: ScoreType | null }): void
}>()

const items = computed(() => [
  { name: 'Совсем нет', value: ScoreType.NOT_AT_ALL },
  { name: 'Немного', value: ScoreType.A_LITTLE_BIT },
  { name: 'Умеренно', value: ScoreType.MODERATELY },
  { name: 'Сильно', value: ScoreType.STRONGLY },
  { name: 'Очень сильно', value: ScoreType.VERY_STRONGLY },
])

const formattedDate = computed(() => {
  return format(props.date, 'dd.MM.yyyy')
})

function getStateHint(hint: string) {
  return hint.length > 45 ? hint : ''
}

function setAnswer(index: number, score: ScoreType | null) {
  emit('set:score', {
    index,
    score,
  })
}
</script>

<style src="./TestCard.scss"></style>
