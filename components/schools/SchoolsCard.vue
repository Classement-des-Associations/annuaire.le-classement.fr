<script lang="ts" setup>
import { School } from '@/types'

defineProps<{
  school: School;
}>()
</script>

<template>
  <BaseCard class="relative h-full">
    <BaseCardTitle class="h-full">
      <NuxtLink :to="`/ecoles/${school.id}/`" class="h-full flex flex-col justify-center">
        {{ school.name }}
        <div class="absolute inset-0" />
      </NuxtLink>
    </BaseCardTitle>
  </BaseCard>
</template>
