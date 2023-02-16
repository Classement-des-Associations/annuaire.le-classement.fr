<script lang="ts" setup>
const { data: schools } = await useSchools()
</script>

<template>
  <BaseGrid v-if="schools">
    <template v-for="school in schools" :key="school.id">
      <li>
        <SchoolsCard :school="school" />
      </li>
    </template>
  </BaseGrid>
</template>
