<script lang="ts" setup>
const logo = {
  srTitle: 'Accueil',
  rightClickUrl: 'https://le-classement.fr/design-kit'
}
</script>

<template>
  <Html dir="ltr">
    <Head>
      <SeoKit />
    </Head>

    <Body>
      <NuxtLink target="_blank" to="https://le-classement.fr" class="block bg-primary-base text-sm hover:underline" rel="noopener">
        <BaseSection class="py-1 text-end">
          Retourner sur le-classement.fr
        </BaseSection>
      </NuxtLink>
      <TheHeader
        sr-navigation-title="Navigation Primaire"
        :logo="logo"
        :dialog="{ srNavigationTitle: 'Navigation Primaire Mobile', srDialogButtonTitle: { open: 'Ouvrir le menu de navigation', close: 'Fermer le menu de navigation' } }"
      />
      <main>
        <NuxtPage />
      </main>
      <TheFooter
        :logo="logo"
        sr-navigation-title="Navigation Secondaire"
      />
    </Body>
  </Html>
</template>
