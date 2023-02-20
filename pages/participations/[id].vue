<script lang="ts" setup>
const route = useRoute()

const { data: school } = await useParticipationById(route.params.id as string)
const { data: associations } = await useAssociationsByParticipationId(route.params.id as string)
</script>

<template>
  <BaseSection class="my-20">
    <BaseH1 v-if="school">
      {{ school.name }}
    </BaseH1>
    <AssociationsRelatedListSection v-if="associations" :associations="associations" class="mt-12">
      Associations participantes
    </AssociationsRelatedListSection>
    <NuxtLink to="/participations/" class="block mt-24 text-lg font-lig">
      Revenir aux participations
    </NuxtLink>
  </BaseSection>
</template>
