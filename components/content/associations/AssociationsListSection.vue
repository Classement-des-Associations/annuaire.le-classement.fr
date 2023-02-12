<script lang="ts" setup>
defineProps<{
  sectionClass?: string;
}>();

const { data: associations } = await useAssociations();
</script>

<template>
  <BaseSection :class="sectionClass">
    <h2 class="sr-only">
      <ContentSlot :use="$slots.srTitle" unwrap="p" />
    </h2>
    <ul v-if="associations">
      <template v-for="association in associations" :key="association.id">
        <li>
          {{ association.name }}
        </li>
      </template>
    </ul>
    <p v-else>
      <ContentSlot :use="$slots.emptyMessage" unwrap="p" />
    </p>
  </BaseSection>
</template>
