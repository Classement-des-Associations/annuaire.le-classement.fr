import consola from 'consola'
import { resolve } from 'pathe'
import { useEnv } from './utils/env.mjs'
import { useExtractContent } from './utils/extract.mjs'
import { clearDir, writeFile } from './utils/fs.mjs'
import { createNotionClient } from './utils/notion.mjs'
import { queryDatabase } from './utils/query.mjs'
import { useSlugify } from './utils/slugify.mjs'

async function main () {
  consola.start('Script', 'Fetch Notion')

  consola.info('Cleaning directories')

  const paths = [
    resolve('content/participations-concours/data'),
    resolve('content/participations-battle/data'),
    resolve('content/categories/data'),
    resolve('content/ecoles/data'),
    resolve('content/associations-etudiantes/data')
  ]
  await Promise.all([
    paths.map(path => clearDir(path, { extensions: ['json'] }))
  ])

  const { categoriesDatabaseId, battleParticipationsDatabaseId, contestParticipationsDatabaseId, schoolsDatabaseId, associationsDatabaseId, notionKey } = useEnv()
  const client = createNotionClient(notionKey)

  // Fetch associations
  const startTimeFetchAssociations = Date.now()
  const associations = await fetchAssociationsDatabase(client, associationsDatabaseId)
  consola.info(`Associations fetched in ${Date.now() - startTimeFetchAssociations}ms`)

  // Fetch schools
  const startTimeFetchSchools = Date.now()
  const schools = await fetchSchoolsDatabase(client, schoolsDatabaseId)
  consola.info(`Schools fetched in ${Date.now() - startTimeFetchSchools}ms`)

  // Fetch contest participations
  const startTimeFetchContestParticipations = Date.now()
  const contestParticipations = await fetchParticipationsDatabase(client, contestParticipationsDatabaseId)
  consola.info(`Contest Participations fetched in ${Date.now() - startTimeFetchContestParticipations}ms`)

  // Fetch battle participations
  const startTimeFetchBattleParticipations = Date.now()
  const battleParticipations = await fetchParticipationsDatabase(client, battleParticipationsDatabaseId)
  consola.info(`Battle participations fetched in ${Date.now() - startTimeFetchBattleParticipations}ms`)

  // Fetch categories
  const startTimeFetchCategories = Date.now()
  const categories = await fetchCategoriesDatabase(client, categoriesDatabaseId)
  consola.info(`Categories fetched in ${Date.now() - startTimeFetchCategories}ms`)

  // Extract contest participations
  for (const { properties } of contestParticipations) {
    const name = useExtractContent(properties.Nom)

    await writeFile(name, 'participations-concours/data', {
      id: useSlugify(name),
      name
    })
  }

  // Extract battle participations
  for (const { properties } of battleParticipations) {
    const name = useExtractContent(properties.Nom)

    await writeFile(name, 'participations-battle/data', {
      id: useSlugify(name),
      name
    })
  }

  // Extract categories
  for (const { properties } of categories) {
    const name = useExtractContent(properties.Nom)
    const icon = useExtractContent(properties.Icon)
    const color = useExtractContent(properties.Couleur)

    await writeFile(name, 'categories/data', {
      id: useSlugify(name),
      name,
      icon,
      color: useSlugify(color.name)
    })
  }

  // Extract schools
  for (const { properties } of schools) {
    const name = useExtractContent(properties.Nom)

    await writeFile(name, 'ecoles/data', {
      id: useSlugify(name),
      name
    })
  }

  // Extract associations
  for (const { properties } of associations) {
    const name = useExtractContent(properties.Nom)
    const description = useExtractContent(properties.Description)
    const linkedin = useExtractContent(properties.LinkedIn)
    const instagram = useExtractContent(properties.Instagram)
    const website = useExtractContent(properties['Site web'])
    const categoriesId = useExtractContent(properties['Catégorie 1'])
    const schoolsPagesId = useExtractContent(properties.Ecoles)
    const contestParticipationsPagesId = useExtractContent(properties['Participations Concours'])
    const battleParticipationsPagesId = useExtractContent(properties['Participations Battle'])

    const relatedCategories = []
    for (const pageId of categoriesId) {
      const category = categories.find(({ id }) => id === pageId)

      if (!category) {
        continue
      }

      const categoryName = useExtractContent(category.properties.Nom)
      const categoryIcon = useExtractContent(category.properties.Icon)
      const categoryColor = useExtractContent(category.properties.Couleur)
      relatedCategories.push({
        id: useSlugify(categoryName),
        name: categoryName,
        icon: categoryIcon,
        color: useSlugify(categoryColor.name)
      })
    }

    const relatedSchools = []
    for (const pageId of schoolsPagesId) {
      const school = schools.find(({ id }) => id === pageId)

      if (!school) {
        continue
      }

      const schoolName = useExtractContent(school.properties.Nom)
      relatedSchools.push({
        id: useSlugify(schoolName),
        name: schoolName
      })
    }

    const relatedContestParticipations = []
    for (const pageId of contestParticipationsPagesId) {
      const participation = contestParticipations.find(({ id }) => id === pageId)

      if (!participation) {
        continue
      }

      const participationName = useExtractContent(participation.properties.Nom)

      relatedContestParticipations.push({
        id: useSlugify(participationName),
        name: participationName
      })
    }

    const relatedBattleParticipations = []
    for (const pageId of battleParticipationsPagesId) {
      const participation = battleParticipations.find(({ id }) => id === pageId)

      if (!participation) {
        continue
      }

      const participationName = useExtractContent(participation.properties.Nom)

      relatedBattleParticipations.push({
        id: useSlugify(participationName),
        name: participationName
      })
    }

    await writeFile(name, 'associations-etudiantes/data', {
      id: useSlugify(name),
      name,
      description,
      linkedin,
      instagram,
      website,
      categoriesId: relatedCategories.map(({ id }) => id),
      schoolsId: relatedSchools.map(({ id }) => id),
      contestParticipationsId: relatedContestParticipations.map(({ id }) => id),
      battleParticipationsId: relatedBattleParticipations.map(({ id }) => id),
      categories: relatedCategories,
      schools: relatedSchools,
      contestParticipations: relatedContestParticipations,
      battleParticipations: relatedBattleParticipations
    })
  }
}

async function fetchAssociationsDatabase (client, databaseId) {
  const associations = await queryDatabase(client, databaseId, {
    property: 'Montrer',
    checkbox: {
      equals: true
    }
  }, [
    {
      property: 'Nom',
      direction: 'ascending'
    }
  ])

  if (!associations.length) {
    throw new Error('No associations found')
  }

  return associations
}

async function fetchSchoolsDatabase (client, databaseId) {
  const schools = await queryDatabase(client, databaseId, {
    property: 'Le Classement',
    rollup: {
      number: {
        greater_than: 0
      }
    }
  }, [
    {
      property: 'Nom',
      direction: 'ascending'
    }
  ])

  if (!schools.length) {
    throw new Error('No schools found')
  }

  return schools
}

async function fetchParticipationsDatabase (client, databaseId) {
  const participations = await queryDatabase(client, databaseId)

  if (!participations.length) {
    throw new Error('No participations found')
  }

  return participations
}

async function fetchCategoriesDatabase (client, databaseId) {
  const categories = await queryDatabase(client, databaseId, undefined, [
    {
      property: 'Nom',
      direction: 'ascending'
    }
  ])

  if (!categories.length) {
    throw new Error('No categories found')
  }

  return categories
}

main().then(() => {
  consola.success('Script finished')
  process.exit(0)
}).catch((error) => {
  consola.fatal(error)
  process.exit(1)
})
