<script lang="ts" setup>
import { Category } from '@/types'

const props = defineProps<{
  category: Category;
}>()

const color = useCategoryColor(props.category.color)
</script>

<template>
  <dl :class="color" class="rounded-md py-1 px-2">
    <dt>
      <span class="sr-only">Catégorie</span>
    </dt>
    <dd>
      {{ category.name }}
    </dd>
  </dl>
</template>
