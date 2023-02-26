<script lang="ts" setup>
import { BattleParticipation } from '@/types'

defineProps<{
  participation: Pick<BattleParticipation, 'id' | 'name'>
}>()
</script>

<template>
  <BaseCard class="relative h-full">
    <BaseCardTitle class="h-full">
      <NuxtLink :to="`/battle/${participation.id}/`" class="h-full flex flex-col justify-center">
        {{ participation.name }}
        <div class="absolute inset-0" />
      </NuxtLink>
    </BaseCardTitle>
  </BaseCard>
</template>
