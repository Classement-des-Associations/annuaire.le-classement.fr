<script lang="ts" setup>
import { Category } from '@/types'

const props = defineProps<{
  category: Category;
}>()

const color = useCategoryColor(props.category.color)
</script>

<template>
  <BaseCard :class="color" class="relative border-none">
    <BaseCardTitle>
      <NuxtLink :to="`/categories/${category.id}/`" class="flex justify-center items-center gap-4">
        <Icon
          :name="category.icon"
        />
        {{ category.name }}
        <div class="absolute inset-0" />
      </NuxtLink>
    </BaseCardTitle>
  </BaseCard>
</template>
