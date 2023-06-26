<script lang="ts" setup>
defineProps<{
  buttonText: string
}>()

const instagramLink = useAppConfig().socials.find(social => social.name === 'Instagram')?.to ?? ''

const { data: associations } = await useAssociations()
const { data: schools } = await useSchools()
const { data: categories } = await useCategories()

type Item = {
  icon: string
  value: string
  label: string
  to: string
  isExternal?: boolean
}

const items = ref<Item[]>([
  {
    icon: 'fluent:people-community-24-filled',
    value: associations.value?.length.toString() ?? '',
    label: 'associations étudiantes',
    to: '/associations-etudiantes'
  },
  {
    icon: 'material-symbols:bookmark',
    value: categories.value?.length.toString() ?? '',
    label: 'catégories',
    to: '/categories'
  },
  {
    icon: 'material-symbols:school-rounded',
    value: schools.value?.length.toString() ?? '',
    label: 'écoles',
    to: '/ecoles'
  },
  {
    icon: 'ph:instagram-logo-fill',
    value: '2.0k',
    label: 'Instagram followers',
    to: instagramLink,
    isExternal: true
  }
])

const buttonLink = useClassementLink('linkedinGroupLink')
</script>

<template>
  <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
    <template v-for="item in items" :key="item.label">
      <li class="group h-full">
        <NuxtLink :to="item.to" class="h-full relative flex flex-col p-6 rounded-3xl gradient-border gradient-border-classement">
          <Icon :name="item.icon" class="w-6 h-6" />
          <span class="mt-2 md:mt-4 text-4xl md:text-5xl font-bold">{{ item.value }}</span>
          <span class="mt-2 md:mt-4 text-lg text-zinc-600 font-medium">{{ item.label }}</span>
          <div class="opacity-0 group-hover:opacity-100 transition ease-in">
            <Icon v-if="item.isExternal" name="heroicons-outline:external-link" class="absolute top-4 right-4 w-4 h-4 text-zinc-600" />
          </div>
        </NuxtLink>
      </li>
    </template>
  </ul>
  <div class="mt-10 flex flex-row justify-center">
    <ClassementLink :button-text="buttonText" :button-link="buttonLink" part="classement" />
  </div>
</template>

<style scoped>
.gradient-border-classement::before {
  background-image: theme('backgroundImage.classement');
}

.gradient-border::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  padding: 2px;
  width: 100%;
  opacity: 0.3;
  transition: opacity 0.2s ease-in-out;
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  border-radius: theme("borderRadius.2xl");
}

.gradient-border:hover::before {
  opacity: 1;
}
</style>
