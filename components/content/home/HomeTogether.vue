<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { Association } from '@/types'

defineProps<{
  sectionClass?: string
  buttonLink: string,
  buttonText: string
}>()

const { smaller } = useBreakpoints(breakpointsTailwind)
const xs = smaller('md')

const limit = 10
const { data: associations10 } = await useAssociationsSlider(0, limit)
const { data: associations20 } = await useAssociationsSlider(40, limit)
const { data: associations30 } = await useAssociationsSlider(80, limit)

const toImg = (association: Pick<Association, 'id' | 'name'>) => {
  return {
    src: `/assets/associations/images/${association.id}.png`,
    alt: `Logo de l'association ${association.name}`,
    width: 400,
    height: 400,
    to: `/associations-etudiantes/${association.id}/`
  }
}

const images10 = computed(() => associations10.value?.map(toImg) ?? [])
const images20 = computed(() => associations20.value?.map(toImg) ?? [])
const images30 = computed(() => associations30.value?.map(toImg) ?? [])

const lines = [images10.value, images20.value, images30.value]

const slidesPerView = limit
const slideWidth = computed(() => {
  return '250px'
})
const imageWidth = computed(() => {
  return '100px'
})
const imageHeight = computed(() => {
  return imageWidth.value
})
const timing = computed(() => {
  if (xs.value) {
    return '40s'
  } else {
    return '80s'
  }
})
</script>

<template>
  <div class="relative flex flex-col gap-4 overflow-hidden">
    <Slider
      v-for="(images, index) in lines"
      :key="index"
      :reversed="index === 1"
      :images="images"
      :slides-per-view="slidesPerView"
      :slide-width="slideWidth"
      :image-width="imageWidth"
      :image-height="imageHeight"
      :timing="timing"
    >
      <template #default="{image}">
        <NuxtLink :to="(image as any).to" class="w-fit flex flex-row justify-center items-center h-full rounded-lg bg-ultra-light-grey">
          <img :src="image.src" :alt="image.alt" :width="image.width" :height="image.height" class="p-2 rounded-xl w-full h-auto">
        </NuxtLink>
      </template>
    </Slider>
    <div class="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-white to-white/0" />
    <div class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white to-white/0" />
  </div>
  <div
    class="mt-10 flex flex-row justify-center"
  >
    <ClassementLink part="classement" :button-link="buttonLink" :button-text="buttonText" />
  </div>
</template>
