<script lang="ts" setup>
const route = useRoute()

const { data: school } = await useContestParticipationById(route.params.id as string)
const { data: associations } = await useAssociationsByContestParticipationId(route.params.id as string)

useSeoMeta({
  title: school?.value ? `Concours ${school.value.name}` : 'Concours',
  description: `Découvrez les associations participantes au Concours ${school?.value?.name ?? ''}`,
  ogImage: 'https://annuaire.le-classement.fr/socials/index.jpg'
})
</script>

<template>
  <BaseSection class="my-20">
    <BaseH1 v-if="school">
      {{ school.name }}
    </BaseH1>
    <AssociationsRelatedListSection v-if="associations" :associations="associations" class="mt-12">
      Associations participantes au Concours
    </AssociationsRelatedListSection>
    <NuxtLink to="/concours/" class="block mt-24 text-lg font-lig">
      Revenir aux années du Concours
    </NuxtLink>
  </BaseSection>
</template>
