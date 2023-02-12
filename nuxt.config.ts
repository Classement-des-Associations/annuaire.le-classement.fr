// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@classement-des-associations/website-theme'],

  content: {
    documentDriven: {
      host: 'https://le-classement.fr',
      surround: false
    },
    defaultLocale: 'fr',
    navigation: {
      fields: ['for', 'dropdown']
    }
  },

  app: {
    head: {
      link: [
        { rel: 'icon', 'type': 'image/png', href: '/favicon.png' },
      ],
    },
  },
})
