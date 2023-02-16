<script lang="ts" setup>
import { Association } from '@/types'

defineProps<{
  association: Association;
}>()
</script>

<template>
  <BaseCard class="relative">
    <!-- For the image, use a hardcoded path and the id -->
    <!-- <img :src="" :alt="association.image.alt" loading="lazy" /> -->
    <div class="flex flex-col gap-4 items-center">
      <h3 class="text-xl lg:text-2xl font-bold text-center">
        <NuxtLink :to="`/associations/${association.id}`">
          {{ association.name }}
          <div class="absolute inset-0" />
        </NuxtLink>
      </h3>
      <NuxtLink class="z-10 order-first" :to="`/categories/${association.category.id}`">
        <CategoriesItem :category="association.category" />
      </NuxtLink>
    </div>
  </BaseCard>
</template>
