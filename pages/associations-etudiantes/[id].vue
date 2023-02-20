<script lang="ts" setup>
const route = useRoute()

const { data: association } = await useAssociationById(route.params.id as string)
const { data: category } = await useCategoryById(association.value?.categoryId ?? '')
const { data: schools } = await useSchoolsById(association.value?.schoolsId ?? [])
const { data: participations } = await useParticipationsById(association.value?.participationsId ?? [])
const { data: relatedAssociations } = await useRelatedAssociationsByCategoryId(association.value?.categoryId ?? '')

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
      <NuxtLink v-if="category" :to="`/categories/${category.id}/`" class="order-first mb-6">
        <CategoriesItem :category="category" icon />
      </NuxtLink>
      <dl v-if="schools" class="mt-2">
        <dt class="sr-only">
          {{ schools.length > 1 ? "Écoles de l'association" : "École de l'association" }}
        </dt>
        <dd class="text-2xl text-black font-medium">
          <Sentence route="/ecoles" :data="schools" />
        </dd>
      </dl>
    </div>
    <p class="mt-8 text-xl">
      {{ association.description }}
    </p>
    <p v-if="participations && participations.length > 0" class="mt-4 text-xl">
      L'association {{ association.name }} a participé au Classement des Associations en <Sentence route="/participations" :data="participations" nuxt-link-class="hover:underline" />.
    </p>
    <Socials :socials="socials" class="mt-8" />
    <AssociationsRelatedListSection v-if="relatedAssociations && relatedAssociations?.length > 0" :associations="relatedAssociations" class="mt-24" />
    <NuxtLink to="/associations-etudiantes/" class="block mt-24 text-lg font-light">
      Revenir aux associations étudiantes
    </NuxtLink>
  </BaseSection>
</template>
