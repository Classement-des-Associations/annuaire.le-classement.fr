<script lang="ts" setup>
defineProps<{
  sectionClass: string
}>()
</script>

<template>
  <BaseSection :class="sectionClass">
    <h2 class="text-5xl font-bold">
      <ContentSlot :use="$slots.title" unwrap="p" />
    </h2>
    <p class="mt-5 max-w-4xl text-zinc-600 text-2xl">
      <ContentSlot :use="$slots.subtitle" unwrap="p" />
    </p>
    <div class="mt-10">
      <ContentSlot :use="$slots.extra" unwrap="p" />
    </div>
  </BaseSection>
</template>
