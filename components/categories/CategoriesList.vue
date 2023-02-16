<script lang="ts" setup>
const { data: categories } = await useCategories()
</script>

<template>
  <BaseGrid v-if="categories">
    <template v-for="category in categories" :key="category.id">
      <li>
        <CategoriesCard :category="category" />
      </li>
    </template>
  </BaseGrid>
</template>
