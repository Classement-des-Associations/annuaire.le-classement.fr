<script lang="ts" setup>
const route = useRoute()

const { data: school } = await useSchoolById(route.params.id as string)
const { data: participation } = await useContestParticipationById(route.params.year as string)

const { data: associations } = await useAssociationsBySchoolIdAndContestParticipationId(route.params.id as string, route.params.year as string)

useSeoMeta({
  title: participation?.value ? `Concours ${participation.value.name}, les associations de ${school?.value?.name ?? ''}` : 'Concours',
  description: `Découvrez les associations participantes au Concours ${participation?.value?.name ?? ''} de ${school?.value?.name ?? ''}`,
  ogImage: 'https://annuaire.le-classement.fr/socials/index.jpg'
})
</script>

<template>
  <BaseSection class="my-20">
    <BaseH1 v-if="participation">
      Concours {{ participation.name }}
    </BaseH1>
    <AssociationsRelatedListSection v-if="associations && school" :associations="associations" class="mt-12">
      Les associations de
      <NuxtLink :to="`/ecoles/${route.params.id}`">
        {{ school.name }}
      </NuxtLink>
    </AssociationsRelatedListSection>
    <NuxtLink :to="`/ecoles/${route.params.id}`" class="block mt-24 text-lg font-lig">
      Revenir à l'établissement
    </NuxtLink>
    <NuxtLink :to="`/concours/${route.params.year}`" class="block mt-8 text-lg font-lig">
      Découvrir les autres associations du Concours {{ route.params.year }}
    </NuxtLink>
  </BaseSection>
</template>
