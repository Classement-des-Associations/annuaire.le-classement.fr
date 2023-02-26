<script lang="ts" setup>
const { data: participations } = await useContestParticipations()
</script>

<template>
  <BaseGrid v-if="participations">
    <template v-for="participation in participations" :key="participation.id">
      <li>
        <ContestParticipationsCard :participation="participation" class="h-full" />
      </li>
    </template>
  </BaseGrid>
</template>
