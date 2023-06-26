<script lang="ts" setup>
const route = useRoute()

const { data: category } = await useCategoryById(route.params.id as string)
const { data: associations } = await useAssociationsByCategoryId(route.params.id as string)

useSeoMeta({
  title: category?.value ? `Catégorie ${category.value.name}` : 'Catégorie',
  description: `Découvrez les associations de la catégorie ${category?.value?.name ?? ''}`,
  ogImage: 'https://annuaire.le-classement.fr/socials/index.jpg'
})
</script>

<template>
  <BaseSection class="my-20">
    <BaseH1 v-if="category" class="flex items-center gap-4">
      <Icon :name="category.icon" /> Catégorie {{ category.name }}
    </BaseH1>
    <AssociationsRelatedListSection v-if="associations" :associations="associations" class="mt-12">
      Toutes les associations
    </AssociationsRelatedListSection>
    <NuxtLink to="/categories/" class="block mt-24 text-lg font-light">
      Revenir aux catégories
    </NuxtLink>
  </BaseSection>
</template>
