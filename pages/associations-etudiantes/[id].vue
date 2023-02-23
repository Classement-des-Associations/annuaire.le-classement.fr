<script lang="ts" setup>
const route = useRoute()

const { data: association } = await useAssociationById(route.params.id as string)
const { data: relatedAssociations } = await useRelatedAssociations(association.value?.id ?? '', association.value?.categoriesId ?? [])

const socials = useSocials(`%s de l'association ${association.value?.name ?? ''}`, {
  linkedin: association.value?.linkedin,
  instagram: association.value?.instagram,
  website: association.value?.website
})

useSeoMeta({
  title: association.value?.name,
  description: association.value?.description
})
</script>

<template>
  <BaseSection v-if="association" class="my-20">
    <div class="flex flex-col items-start">
      <h1 class="text-5xl text-black font-bold">
        {{ association.name }}
      </h1>
      <template v-if="association.categories">
        <NuxtLink v-for="category in association.categories" :key="category.id" :to="`/categories/${category.id}`" class="order-first mb-6">
          <CategoriesItem :category="category" icon />
        </NuxtLink>
      </template>
      <dl v-if="association.schools" class="mt-2">
        <dt class="sr-only">
          {{ association.schools.length > 1 ? "Écoles de l'association" : "École de l'association" }}
        </dt>
        <dd class="text-2xl text-black font-medium">
          <Sentence route="/ecoles" :data="association.schools" />
        </dd>
      </dl>
    </div>
    <p class="mt-8 text-xl">
      {{ association.description }}
    </p>
    <template v-if="association.participations">
      <p v-if="association.participations.length > 0" class="mt-4 text-xl">
        L'association {{ association.name }} a participé au Classement des Associations en <Sentence route="/participations-concours" :data="association.participations" nuxt-link-class="hover:underline" />.
      </p>
    </template>
    <Socials :socials="socials" class="mt-8" />
    <template v-if="relatedAssociations">
      <AssociationsRelatedListSection v-if="relatedAssociations?.length > 0" :associations="relatedAssociations.filter(Boolean)" class="mt-24" />
    </template>
    <NuxtLink to="/associations-etudiantes" class="block mt-24 text-lg font-light">
      Revenir aux associations étudiantes
    </NuxtLink>
  </BaseSection>
</template>
