<script lang="ts" setup>
import { Association } from '@/types'

defineProps<{
  associations: Pick<Association, 'id' | 'name' | 'categories'>[];
  disableTwoColumns?: boolean;
}>()
</script>

<template>
  <BaseGrid :disable-two-columns="disableTwoColumns">
    <template v-for="association in associations" :key="association.id">
      <li>
        <AssociationsCard :association="association"  class="h-full" />
      </li>
    </template>
  </BaseGrid>
</template>
