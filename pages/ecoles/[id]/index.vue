<script lang="ts" setup>
import { Association } from '@/types'

const route = useRoute()

const { data: battle } = await useBattleBySchoolId(route.params.id as string)
const { data: contests } = await useContestsBySchoolId(route.params.id as string)
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

const uniqueBattle = computed(() => {
  if (!battle) { return null }

  if (!battle.value) { return null }

  const data = new Set<string>()

  battle.value.forEach((item) => {
    (item.battleParticipationsId as string[]).forEach((id) => {
      data.add(id)
    })
  })

  return Array.from(data).map((item) => {
    return {
      id: item as string,
      name: item as string
    }
  })
})

const uniqueContests = computed(() => {
  if (!contests) { return null }

  if (!contests.value) { return null }

  const data = new Set<string>()

  contests.value.forEach((item) => {
    (item.contestParticipationsId as string[]).forEach((id) => {
      data.add(id)
    })
  })

  return Array.from(data).map((item) => {
    return {
      id: item as string,
      name: item as string
    }
  })
})

const pluralize = (value: number, name: string) => {
  if (name.endsWith('s')) { return name }

  return value > 1 ? `${name}s` : name
}

useSeoMeta({
  title: school?.value ? `La vie associative de ${school.value.name}` : 'Un établissement d\'enseignement supérieur',
  description: `Découvrez les associations de ${school?.value?.name ?? ''}`,
  ogImage: 'https://annuaire.le-classement.fr/socials/index.jpg'
})
</script>

<template>
  <BaseSection class="my-20">
    <BaseH1 v-if="school">
      {{ school.name }}
    </BaseH1>
    <template v-if="associations">
      <!-- Update text size -->
      <p class="mt-8 text-lg md:text-xl md:leading-8">
        L'établissement possède
        <strong class="font-semibold">{{ associations.length }}</strong>
        {{ pluralize(associations.length, 'association') }} dans
        <strong class="font-semibold">
          {{ associationsByCategory.size }}
        </strong>
        {{ pluralize(associationsByCategory.size, 'catégorie') }}.
      </p>
      <ul class="ml-8 mt-4 list-disc text-lg md:text-xl md:leading-8">
        <li v-for="([categoryName, schoolAssociations]) in associationsByCategory" :key="categoryName">
          <strong class="font-semibold">
            {{ schoolAssociations.length }}
          </strong>
          {{ pluralize(schoolAssociations.length, categoryName) }}
        </li>
      </ul>
      <p class="mt-8 text-lg md:text-xl md:leading-8">
        Les associations ont participé
        <template v-if="uniqueBattle && uniqueBattle?.length > 0">
          à la Battle <Sentence :route="`/ecoles/${route.params.id}/battle`" :data="uniqueBattle" />
        </template>
        <template v-if="uniqueBattle && uniqueBattle?.length > 0 && uniqueContests && uniqueContests?.length > 0">
          et
        </template>
        <template v-if="uniqueContests && uniqueContests?.length > 0">
          au Concours <Sentence :route="`/ecoles/${route.params.id}/concours`" :data="uniqueContests" />
          <span>.</span>
        </template>
      </p>
      <AssociationsRelatedListSection :associations="associations" class="mt-12">
        Associations de l'école
      </AssociationsRelatedListSection>
    </template>
    <NuxtLink to="/ecoles/" class="block mt-24 text-lg font-lig">
      Revenir aux établissements
    </NuxtLink>
  </BaseSection>
</template>
