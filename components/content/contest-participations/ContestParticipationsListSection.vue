<script lang="ts" setup>
defineProps<{
  sectionClass?: string
}>()
</script>

<template>
  <BaseSection :class="sectionClass">
    <h2 class="sr-only">
      <ContentSlot :use="$slots.srTitle" unwrap="p" />
    </h2>
    <ContestParticipationsList />
  </BaseSection>
</template>
