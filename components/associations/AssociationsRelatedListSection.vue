<script lang="ts" setup>
import { Association } from '@/types'

defineProps<{
  associations: Association[]
}>()

</script>

<template>
  <section>
    <h2 class="text-2xl font-semibold">
      <slot>
        Associations similaires
      </slot>
    </h2>
    <AssociationsList :associations="associations" class="mt-4" />
  </section>
</template>
