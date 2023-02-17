<script lang="ts" setup>
const route = useRoute()

const { data: school } = await useSchool(route.params.id as string)
const { data: associations } = await useAssociationsBySchool(route.params.id as string)
</script>

<template>
  <BaseSection class="my-20">
    <h1 v-if="school">
      {{ school.name }}
    </h1>
    <AssociationsList v-if="associations" :associations="associations" class="mt-12">
      {{ associations }}
    </AssociationsList>
  </BaseSection>
</template>
