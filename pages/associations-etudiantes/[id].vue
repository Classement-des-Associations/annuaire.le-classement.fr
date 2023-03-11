<script lang="ts" setup>
const route = useRoute()

const { data: association } = await useAssociationById(route.params.id as string)
const { data: relatedAssociations } = await useRelatedAssociations(association.value?.id ?? '', association.value?.categoriesId ?? [])
const hasRelatedAssociations = computed(() => relatedAssociations.value && relatedAssociations.value.filter(Boolean))

const socials = useSocials(`%s de l'association ${association.value?.name ?? ''}`, {
  linkedin: association.value?.linkedin,
  instagram: association.value?.instagram,
  website: association.value?.website
})

useSeoMeta({
  title: association.value?.name,
  description: association.value?.description ?? `Présentation de l'association ${association.value?.name ?? ''}`,
  ogImage: 'https://annuaire.le-classement.fr/socials/index.jpg'
})
</script>

<template>
  <BaseSection v-if="association" class="my-20">
    <div class="flex flex-col items-start">
      <h1 class="text-3xl md:text-5xl text-black font-bold">
        {{ association.name }}
      </h1>
      <template v-if="association.categories">
        <NuxtLink v-for="category in association.categories" :key="category.id" :to="`/categories/${category.id}/`" class="order-first mb-6">
          <CategoriesItem :category="category" icon />
        </NuxtLink>
      </template>
      <dl v-if="association.schools" class="mt-2">
        <dt class="sr-only">
          {{ association.schools.length > 1 ? "Écoles de l'association" : "École de l'association" }}
        </dt>
        <dd class="text-xl md:text-2xl text-black font-medium">
          <Sentence route="/ecoles" :data="association.schools" />
        </dd>
      </dl>
    </div>
    <p class="mt-8 text-lg md:text-xl md:leading-8">
      {{ association.description }}
    </p>
    <p class="mt-4 text-lg md:text-xl md:leading-8">
      L'association {{ association.name }} a participé
      <template v-if="association.battleParticipations.length">
        à la <NuxtLink to="https://le-classement.fr/classement/battle" target="_blank" class="hover:underline inline-block">
          Battle du Classement
        </NuxtLink>
        en <Sentence route="/battle" :data="association.battleParticipations" nuxt-link-class="hover:underline" />.
      </template>
      <template v-if="association.battleParticipations.length && association.contestParticipations.length">
        et
      </template>
      <template v-if="association.contestParticipations.length">
        au
        <NuxtLink to="https://le-classement.fr/classement/concours" target="_blank" class="hover:underline inline-block">
          Concours du Classement
        </NuxtLink>
        en <Sentence route="/concours" :data="association.contestParticipations" nuxt-link-class="hover:underline" />.
      </template>
    </p>
    <Socials :socials="socials" class="mt-8" />
    <template v-if="relatedAssociations && hasRelatedAssociations?.length">
      <AssociationsRelatedListSection v-if="relatedAssociations?.length > 0" :associations="relatedAssociations.filter(Boolean)" class="mt-24" />
    </template>
    <NuxtLink to="/associations-etudiantes/" class="block mt-24 text-lg font-light">
      Revenir aux associations étudiantes
    </NuxtLink>
  </BaseSection>
</template>
