// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@classement-des-associations/website-theme'],

  runtimeConfig: {
    public: {
      titleSeparator: '·',
      siteUrl: 'https://annuaire.le-classement.fr',
      siteName: 'L\'Annuaire du Classement',
      siteDescription: 'L\'annuaire de référence qui rassemble l\'ensemble de la vie associative étudiante.',
      language: 'fr-FR'
    }
  },

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
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  },

  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true
    }
  }
})
