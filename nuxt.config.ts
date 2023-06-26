// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@classement-des-associations/website-theme'],

  modules: [
    '@vueuse/nuxt',
    'nuxt-clarity-analytics'
  ],

  runtimeConfig: {
    public: {
      contributeFormLink: 'https://example.com',
      // newsletterSubscriptionLink: 'https://example.com',
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
    ignores: [
      'blog:index.md'
    ],
    documentDriven: {
      trailingSlash: true,
      host: 'https://annuaire.le-classement.fr',
      surround: false
    },
    defaultLocale: 'fr',
    navigation: {
      fields: ['for', 'dropdown']
    },
    sources: {
      github: {
        prefix: '/blog',
        driver: 'github',
        repo: 'Classement-des-Associations/le-classement.fr',
        branch: 'main',
        dir: '/content/3.blog',
        token: process.env.GITHUB_TOKEN
      }
    }
  },

  linkChecker: {
    exclude: ['/associations-etudiantes', '/battle', '/concours', '/ecoles', '/categories', '/a-propos', '/cgu']
  },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ],
      meta: [
        {
          name: 'google-site-verification',
          content: 'TdbVQQq00musVnOqyiFS2ulrIvi29dUNAhPXtGXWags'
        }
      ]
    }
  },

  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true
    }
  },

  devtools: true
})
