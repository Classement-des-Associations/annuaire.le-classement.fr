<script lang="ts" setup>
const route = useRoute()

const { data: category } = await useCategory(route.params.id as string)
const { data: associations } = await useAssociationsByCategory(route.params.id as string)
</script>

<template>
  <BaseSection class="my-20">
    <h1 v-if="category">
      {{ category.name }}
    </h1>
    <AssociationsList v-if="associations" :associations="associations" class="mt-12">
      {{ associations }}
    </AssociationsList>
  </BaseSection>
</template>
