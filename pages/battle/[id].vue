<script lang="ts" setup>
const route = useRoute()

const { data: participation } = await useBattleParticipationById(route.params.id as string)
const { data: associations } = await useAssociationsByBattleParticipationId(route.params.id as string)

useSeoMeta({
  title: participation?.value ? `Battle ${participation.value.name}` : 'Battle',
  ogTitle: participation?.value ? `Battle ${participation.value.name}` : 'Battle',
  description: `Découvrez les associations participantes à la Battle ${participation?.value?.name ?? ''}`,
  ogImage: 'https://annuaire.le-classement.fr/socials/index.jpg'
})
</script>

<template>
  <BaseSection class="my-20">
    <BaseH1 v-if="participation">
      {{ participation.name }}
    </BaseH1>
    <AssociationsRelatedListSection v-if="associations" :associations="associations" class="mt-12">
      Associations participantes à la Battle
    </AssociationsRelatedListSection>
    <NuxtLink to="/battle/" class="block mt-24 text-lg font-lig">
      Revenir aux années de la Battle
    </NuxtLink>
  </BaseSection>
</template>
