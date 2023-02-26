<script lang="ts" setup>
import { Association } from '@/types'

defineProps<{
  association: Pick<Association, 'id' | 'name' | 'categories'>;
}>()
</script>

<template>
  <BaseCard class="relative">
    <!-- For the image, use a hardcoded path and the id -->
    <!-- <img :src="" :alt="association.image.alt" loading="lazy" /> -->
    <div class="flex flex-col gap-4 items-center">
      <h3 class="text-xl lg:text-2xl font-bold text-center">
        <NuxtLink :to="`/associations-etudiantes/${association.id}/`">
          {{ association.name }}
          <div class="absolute inset-0" />
        </NuxtLink>
      </h3>
      <template v-if="association.categories">
        <NuxtLink v-for="category in association.categories" :key="category.id" class="z-10 order-first" :to="`/categories/${category.id}/`">
          <CategoriesItem :category="category" />
        </NuxtLink>
      </template>
    </div>
  </BaseCard>
</template>
