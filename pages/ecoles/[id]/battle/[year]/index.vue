<script lang="ts" setup>
const route = useRoute()

const { data: school } = await useSchoolById(route.params.id as string)
const { data: participation } = await useBattleParticipationById(route.params.year as string)

const { data: associations } = await useAssociationsBySchoolIdAndBattleParticipationId(route.params.id as string, route.params.year as string)

useSeoMeta({
  title: participation?.value ? `Battle ${participation.value.name} de l'école ${school?.value?.name ?? ''}` : 'Battle',
  description: `Découvrez les associations participantes à la Battle ${participation?.value?.name ?? ''} de l'école ${school?.value?.name ?? ''}`,
  ogImage: 'https://annuaire.le-classement.fr/socials/index.jpg'
})
</script>

<template>
  <BaseSection class="my-20">
    <BaseH1 v-if="participation && school">
      Les associations de {{ school.name }}
    </BaseH1>
    <AssociationsRelatedListSection v-if="associations && participation" :associations="associations" class="mt-12">
      Qui ont participé à la Battle {{ participation.name }}
    </AssociationsRelatedListSection>
    <NuxtLink :to="`/ecoles/${route.params.id}`" class="block mt-24 text-lg font-lig">
      Revenir à l'école
    </NuxtLink>
    <NuxtLink :to="`/battle/${route.params.year}`" class="block mt-8 text-lg font-lig">
      Découvrir les autres associations de la Battle {{ route.params.year }}
    </NuxtLink>
  </BaseSection>
</template>
