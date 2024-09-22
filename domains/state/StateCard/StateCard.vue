<template>
  <div class="state-card">
    <img :src="url" :alt="alt" class="state-card__image" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  url: string
  alt: string
}>()
</script>

<style src="./StateCard.scss"></style>
