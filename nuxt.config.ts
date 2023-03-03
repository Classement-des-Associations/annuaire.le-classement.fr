// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@classement-des-associations/website-theme'],

  modules: [
    '@vueuse/nuxt'
  ],

  runtimeConfig: {
    public: {
      contributeFormLink: 'https://example.com',
      newsletterSubscriptionLink: 'https://example.com',
      linkedinGroupLink: 'https://example.com',
      trailingSlash: true,
      titleSeparator: '·',
      siteUrl: 'https://annuaire.le-classement.fr',
      siteName: 'L\'Annuaire du Classement',
      siteDescription: 'L\'annuaire de référence qui rassemble l\'ensemble de la vie associative étudiante.',
      language: 'fr-FR'
    }
  },

  content: {
    documentDriven: {
      trailingSlash: true,
      host: 'https://annuaire.le-classement.fr',
      surround: false
    },
    defaultLocale: 'fr',
    navigation: {
      fields: ['for', 'dropdown']
    }
  },

  linkChecker: {
    exclude: ['/associations-etudiantes', '/battle', '/concours', '/ecoles', 'categories']
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
