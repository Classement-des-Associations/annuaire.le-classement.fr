// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@classement-des-associations/website-theme'],

  app: {
    head: {
      link: [
        { rel: 'icon', 'type': 'image/png', href: '/favicon.png' },
      ],
    },
  },
})
