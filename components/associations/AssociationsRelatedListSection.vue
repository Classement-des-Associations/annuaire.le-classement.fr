<script lang="ts" setup>
import { Association } from '@/types'

defineProps<{
  associations: Pick<Association, 'id' | 'name' | 'categories'>[]
}>()

</script>

<template>
  <section>
    <h2 class="text-xl md:text-2xl font-semibold">
      <slot>
        Associations similaires
      </slot>
    </h2>
    <AssociationsList :associations="associations" disable-two-columns class="mt-4" />
  </section>
</template>
