<script lang="ts" setup>
import { ContestParticipation } from '@/types'

defineProps<{
  participation: Pick<ContestParticipation, 'id' | 'name'>
}>()
</script>

<template>
  <BaseCard class="relative h-full">
    <BaseCardTitle class="h-full">
      <NuxtLink :to="`/participations-concours/${participation.id}/`" class="h-full flex flex-col justify-center">
        {{ participation.name }}
        <div class="absolute inset-0" />
      </NuxtLink>
    </BaseCardTitle>
  </BaseCard>
</template>
