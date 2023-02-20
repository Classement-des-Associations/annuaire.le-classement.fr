<script lang="ts" setup>
const route = useRoute()

const { data: category } = await useCategoryById(route.params.id as string)
const { data: associations } = await useAssociationsByCategory(route.params.id as string)
</script>

<template>
  <BaseSection class="my-20">
    <BaseH1
      v-if="category"
      class="flex items-center gap-4"
    >
      <Icon
        :name="category.icon"
      /> {{ category.name }}
    </BaseH1>
    <AssociationsRelatedListSection v-if="associations" :associations="associations" class="mt-12">
      Associations de la catégorie
    </AssociationsRelatedListSection>
    <NuxtLink to="/categories/" class="block mt-16 text-lg font-light">
      Revenir aux catégories
    </NuxtLink>
  </BaseSection>
</template>
