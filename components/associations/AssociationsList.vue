<script lang="ts" setup>
const { data: associations } = await useAssociations()
</script>

<template>
  <BaseGrid v-if="associations">
    <template
      v-for="association in associations"
      :key="association.id"
    >
      <li>
        <AssociationsCard
          :association="association"
          class="h-full"
        />
      </li>
    </template>
  </BaseGrid>
</template>
