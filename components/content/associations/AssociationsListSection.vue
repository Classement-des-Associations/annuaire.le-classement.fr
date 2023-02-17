<script lang="ts" setup>
defineProps<{
  sectionClass?: string;
}>()

const { data: associations } = await useAssociations()
</script>

<template>
  <BaseSection :class="sectionClass">
    <h2 class="sr-only">
      <ContentSlot :use="$slots.srTitle" unwrap="p" />
    </h2>
    <AssociationsList v-if="associations" :associations="associations" />
  </BaseSection>
</template>
