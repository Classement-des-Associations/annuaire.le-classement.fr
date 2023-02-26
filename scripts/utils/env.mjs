import * as dotenv from 'dotenv'
dotenv.config()

/**
 * Use environment variables
 *
 * @typedef {Object} Env
 * @property {string} notionKey
 * @property {string} associationsDatabaseId
 * @property {string} schoolsDatabaseId
 * @property {string} contestParticipationsDatabaseId
 * @property {string} battleParticipationsDatabaseId
 * @property {string} categoriesDatabaseId
 * @returns {Env}
 * @throws {Error}
 */
export const useEnv = function () {
  const notionKey = process.env.NOTION_KEY
  if (!notionKey) {
    throw new Error('No notion key found')
  }

  const associationsDatabaseId = process.env.NOTION_ASSOCIATIONS_DATABASE_ID
  if (!associationsDatabaseId) {
    throw new Error('No association database ID found')
  }

  const schoolsDatabaseId = process.env.NOTION_SCHOOLS_DATABASE_ID
  if (!schoolsDatabaseId) {
    throw new Error('No school database ID found')
  }

  const contestParticipationsDatabaseId = process.env.NOTION_CONTEST_PARTICIPATIONS_DATABASE_ID
  if (!contestParticipationsDatabaseId) {
    throw new Error('No contest participation database ID found')
  }

  const battleParticipationsDatabaseId = process.env.NOTION_BATTLE_PARTICIPATIONS_DATABASE_ID
  if (!battleParticipationsDatabaseId) {
    throw new Error('No battle participation database ID found')
  }

  const categoriesDatabaseId = process.env.NOTION_CATEGORIES_DATABASE_ID
  if (!categoriesDatabaseId) {
    throw new Error('No category database ID found')
  }

  return {
    notionKey,
    associationsDatabaseId,
    schoolsDatabaseId,
    contestParticipationsDatabaseId,
    battleParticipationsDatabaseId,
    categoriesDatabaseId
  }
}
