<script lang="ts" setup>
import { Association } from '@/types'

defineProps<{
  association: Pick<Association, 'id' | 'name' | 'categories'>;
}>()
</script>

<template>
  <BaseCard class="relative">
    <div class="h-24 flex flex-col justify-center">
      <img :src="`/assets/associations/images/${association.id}.png`" :alt="`Logo de l'association ${association.name}`" loading="lazy" class="max-h-[6rem] mx-auto" />
    </div>
    <div class=" mt-3 flex flex-col gap-4 items-center">
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
