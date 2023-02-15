<script lang="ts" setup>
const { data: associations } = await useAssociations()
</script>

<template>
  <ul v-if="associations" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-x-8 lg:gap-y-12">
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
  </ul>
</template>
