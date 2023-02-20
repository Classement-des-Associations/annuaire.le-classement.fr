<script lang="ts" setup>
const route = useRoute()

const { data: association } = await useAssociationById(route.params.id as string)
const { data: category } = await useCategoryById(association.value?.categoryId ?? '')
const { data: schools } = await useSchoolsById(association.value?.schoolsId ?? [])
const { data: participations } = await useParticipationsById(association.value?.participationsId ?? [])
const { data: relatedAssociations } = await useRelatedAssociationsByCategoryId(association.value?.categoryId ?? '')

const socials = useSocials(`%s de l'association ${association.value?.name ?? ''}`, {
  linkedin: association.value?.linkedin,
  instagram: association.value?.instagram,
  website: association.value?.website
})

useSeoMeta({
  title: association.value?.name,
  description: association.value?.description
})
</script>

<template>
  <BaseSection v-if="association" class="my-20">
    <div class="flex flex-col items-start gap-6">
      <h1 class="text-5xl text-black font-bold">
        {{ association.name }}
      </h1>
      <CategoriesItem v-if="category" :category="category" icon class="order-first" />
      <dl v-if="schools">
        <dt class="sr-only">
          {{ schools.length > 1 ? "Écoles de l'association" : "École de l'association" }}
        </dt>
        <dd class="text-2xl text-black font-medium">
          {{ schools }}
        </dd>
      </dl>
    </div>
    <p class="mt-8 text-xl">
      {{ association.description }}
    </p>
    <p class="mt-4 text-xl">
      <!-- L'association {{ association.name }} a participé au Classement des Associations en {{
        useSentence(association.years)
      }}. -->
      {{ participations }}
    </p>
    <Socials :socials="socials" class="mt-8" />
    <section v-if="relatedAssociations && relatedAssociations?.length > 0" class="mt-16">
      <h2 class="text-xl">
        Associations en lien
      </h2>
      <AssociationsList :associations="relatedAssociations" class="mt-4" />
    </section>
    <NuxtLink to="/associations-etudiantes" class="block mt-4 text-lg">
      Retour aux associations
    </NuxtLink>
  </BaseSection>
</template>
