<script lang="ts" setup>
import { Association } from '@/types'

const props = defineProps<{
  association: Association;
}>()

const { data: category } = await useCategoryById(props.association?.categoryId)
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
      <NuxtLink v-if="category" class="z-10 order-first" :to="`/categories/${category.id}`">
        <CategoriesItem :category="category" />
      </NuxtLink>
    </div>
  </BaseCard>
</template>
