<script lang="ts" setup>
defineProps<{
  nuxtLinkClass?: string,
  route: string
  data: {
    id: string,
    name: string,
  }[]
}>()
</script>

<template>
  <template v-for="item in data" :key="item.id">
    <NuxtLink :to="`${route}/${item.id}/`" :class="nuxtLinkClass">
      {{ item.name }}
    </NuxtLink>
    <template v-if="data.length > 1 && data.indexOf(item) < data.length - 2">
      ,
    </template>
    <template v-if="data.length > 1 && data.indexOf(item) === data.length - 2">
      et
    </template>
  </template>
</template>
