<script lang="ts" setup>
const route = useRoute()

const { data: school } = await useSchoolById(route.params.id as string)
const { data: associations } = await useAssociationsBySchool(route.params.id as string)
</script>

<template>
  <BaseSection class="my-20">
    <BaseH1 v-if="school">
      {{ school.name }}
    </BaseH1>
    <AssociationsRelatedListSection v-if="associations" :associations="associations" class="mt-12">
      Associations de l'école
    </AssociationsRelatedListSection>
    <NuxtLink to="/ecoles/" class="block mt-16 text-lg font-lig">
      Revenir aux écoles
    </NuxtLink>
  </BaseSection>
</template>
