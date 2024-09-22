<template>
  <v-dialog class="ls-modal" v-model="currentModelValue" :max-width="maxWidth">
    <v-card>
      <v-card-title class="ls-modal__header">
        <slot name="title" />

        <v-btn class="ls-modal__close" icon :elevation="0" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <slot />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  modelValue: boolean
  maxWidth?: number
}>()

const emit = defineEmits<{
  (e: 'update:model-value', v: boolean): void
}>()

const currentModelValue = useVModel(props, 'modelValue', emit)

function close() {
  emit('update:model-value', false)
}
</script>

<style src="./LsModal.scss"></style>
