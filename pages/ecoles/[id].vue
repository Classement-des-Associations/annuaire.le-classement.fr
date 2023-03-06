<script lang="ts" setup>
import { Association } from '@/types'

const route = useRoute()

const { data: school } = await useSchoolById(route.params.id as string)
const { data: associations } = await useAssociationsBySchoolId(route.params.id as string)

// Group associations by category
const associationsByCategory = computed((): Map<string, Association[]> => {
  if (!associations.value) { return new Map() }

  const associationsByCategory = new Map<string, Association[]>()

  associations.value.forEach((association) => {
    if (!association.categories) { return }

    association.categories.forEach((category) => {
      if (!associationsByCategory.has(category.name)) {
        associationsByCategory.set(category.name, [])
      }
      associationsByCategory.get(category.name)!.push(association)
    })
  })

  return associationsByCategory
})

const pluralize = (value: number, name: string) => {
  if (name.endsWith('s')) { return name }

  return value > 1 ? `${name}s` : name
}

useSeoMeta({
  title: school?.value ? `L'École ${school.value.name} et ses associations` : 'Une École',
  description: `Découvrez les associations de l'école ${school?.value?.name ?? ''}`
})
</script>

<template>
  <BaseSection class="my-20">
    <BaseH1 v-if="school">
      {{ school.name }}
    </BaseH1>
    <p v-if="associations" class="mt-8 text-lg">
      L'école possède
      <strong class="font-semibold">{{ associations.length }}</strong>
      {{ pluralize(associations.length, 'association') }} dans
      <strong class="font-semibold">
        {{ associationsByCategory.size }}
      </strong>
      {{ pluralize(associationsByCategory.size, 'catégorie') }}.
      <ul class="ml-8 mt-4 list-disc">
        <li v-for="([categoryName, schoolAssociations]) in associationsByCategory" :key="categoryName">
          <ul>
            <li>
              <strong class="font-semibold">
                {{ schoolAssociations.length }}
              </strong>
              {{ pluralize(schoolAssociations.length, categoryName) }}
            </li>
          </ul>
        </li>
      </ul>
    </p>
    <AssociationsRelatedListSection v-if="associations" :associations="associations" class="mt-12">
      Associations de l'école
    </AssociationsRelatedListSection>
    <NuxtLink to="/ecoles/" class="block mt-24 text-lg font-lig">
      Revenir aux écoles
    </NuxtLink>
  </BaseSection>
</template>
