<script lang="ts" setup>
import { Participation } from '@/types'

defineProps<{
  participation: Participation;
}>()
</script>

<template>
  <BaseCard class="relative h-full">
    <BaseCardTitle class="h-full">
      <NuxtLink :to="`/participations/${participation.id}/`" class="h-full flex flex-col justify-center">
        {{ participation.name }}
        <div class="absolute inset-0" />
      </NuxtLink>
    </BaseCardTitle>
  </BaseCard>
</template>
