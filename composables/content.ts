import { Association, BattleParticipation, Category, ContestParticipation, School } from '@/types'

export const useAssociations = () => {
  return useAsyncData('content:associations', () =>
    queryContent<Association>('/associations-etudiantes/data').where({
      _partial: true,
      _extension: 'json'
    })
      .only(['id', 'name', 'categories'])
      .find()
  )
}

export const useAssociationsSlider = (skip: number, limit: number) => {
  return useAsyncData(`content:associations:slider:${skip}:${limit}`, () => {
    return queryContent<Association>('/associations-etudiantes/data').where({
      _partial: true
    })
      .only(['name', 'id'])
      .skip(skip)
      .limit(limit)
      .find()
  })
}

export const useAssociationById = (associationId: string) => {
  return useAsyncData(`content:association:${associationId}`, () =>
    queryContent<Association>('/associations-etudiantes/data').where({
      _partial: true,
      _extension: 'json',
      id: associationId
    })
      .findOne()
  )
}

export const useAssociationsByCategoryId = (categoryId: string) => {
  return useAsyncData(`content:associations:${categoryId}`, () =>
    queryContent<Association>('/associations-etudiantes/data').where({
      _partial: true,
      _extension: 'json',
      categoriesId: {
        $contains: categoryId
      }
    })
      .only(['id', 'name', 'categories'])
      .find()
  )
}

export const useAssociationsBySchoolId = (schoolId: string) => {
  return useAsyncData(`content:associations:${schoolId}`, () =>
    queryContent<Association>('/associations-etudiantes/data').where({
      _partial: true,
      _extension: 'json',
      schoolsId: {
        $contains: schoolId
      }
    })
      .find()
  )
}

export const useAssociationsBySchoolIdAndBattleParticipationId = (schoolId: string, participationId: string) => {
  return useAsyncData(`content:associations:${schoolId}:${participationId}`, () =>
    queryContent<Association>('/associations-etudiantes/data').where({
      _partial: true,
      _extension: 'json',
      schoolsId: {
        $contains: schoolId
      },
      battleParticipationsId: {
        $contains: participationId
      }
    })
      .only(['id', 'name', 'categories'])
      .find()
  )
}

export const useAssociationsByContestParticipationId = (participationId: string) => {
  return useAsyncData(`content:associations:${participationId}`, () =>
    queryContent<Association>('/associations-etudiantes/data').where({
      _partial: true,
      _extension: 'json',
      contestParticipationsId: {
        $contains: participationId
      }
    })
      .only(['id', 'name', 'categories'])
      .find()
  )
}

export const useAssociationsByBattleParticipationId = (participationId: string) => {
  return useAsyncData(`content:associations:${participationId}`, () =>
    queryContent<Association>('/associations-etudiantes/data').where({
      _partial: true,
      _extension: 'json',
      battleParticipationsId: {
        $contains: participationId
      }
    })
      .only(['id', 'name', 'categories'])
      .find()
  )
}

export const useRelatedAssociations = (associationId: string, categoriesId: string[]) => {
  return useAsyncData(`content:associations:related:${associationId}`, () =>
    queryContent<Association>().where({
      _partial: true,
      _extension: 'json',
      categoriesId: {
        $contains: categoriesId
      }
    }).only(['id', 'name', 'categories'])
      .findSurround(`/associations-etudiantes/data/_${associationId}`, {
        before: 0, // @see seems to be broken
        after: 3
      })
  )
}

export const useCategories = () => {
  return useAsyncData('content:categories', () =>
    queryContent<Category>('/categories/data').where({
      _partial: true,
      _extension: 'json'
    })
      .only(['id', 'name', 'icon', 'color'])
      .find()
  )
}

export const useCategoryById = (categoryId: string) => {
  return useAsyncData(`content:category:${categoryId}`, () =>
    queryContent<Category>('/categories/data').where({
      _partial: true,
      _extension: 'json',
      id: categoryId
    })
      .findOne()
  )
}

export const useSchools = () => {
  return useAsyncData('content:schools', () =>
    queryContent<School>('/ecoles/data').where({
      _partial: true,
      _extension: 'json'
    })
      .only(['id', 'name'])
      .find()
  )
}

export const useSchoolsById = (schoolsId: string[]) => {
  return useAsyncData(`content:schools:${schoolsId.join(':')}`, () =>
    queryContent<School>('/ecoles/data').where({
      _partial: true,
      _extension: 'json',
      id: {
        $in: schoolsId
      }
    })
      .only(['id', 'name'])
      .find()
  )
}

export const useSchoolById = (schoolId: string) => {
  return useAsyncData(`content:school:${schoolId}`, () =>
    queryContent<School>('/ecoles/data').where({
      _partial: true,
      _extension: 'json',
      id: schoolId
    })
      .only(['id', 'name'])
      .findOne()
  )
}

export const useContestParticipations = () => {
  return useAsyncData('content:contest-participations', () =>
    queryContent<ContestParticipation>('/concours/data').where({
      _partial: true,
      _extension: 'json'
    })
      .only(['id', 'name'])
      .find()
  )
}

export const useContestParticipationById = (participationId: string) => {
  return useAsyncData(`content:contest-participation:${participationId}`, () =>
    queryContent<ContestParticipation>('/concours/data').where({
      _partial: true,
      _extension: 'json',
      id: participationId
    })
      .only(['id', 'name'])
      .findOne()
  )
}

export const useContestParticipationsById = (participationsId: string[]) => {
  return useAsyncData(`content:contest-participations:${participationsId.join(':')}`, () =>
    queryContent<ContestParticipation>('/concours/data').where({
      _partial: true,
      _extension: 'json',
      id: {
        $in: participationsId
      }
    })
      .sort({ categoriesId: 1, name: -1 })
      .only(['id', 'name', 'categories'])
      .find()
  )
}

export const useBattleParticipations = () => {
  return useAsyncData('content:battle-participations', () =>
    queryContent<BattleParticipation>('/battle/data').where({
      _partial: true,
      _extension: 'json'
    })
      .only(['id', 'name'])
      .find()
  )
}

export const useBattleParticipationById = (participationId: string) => {
  return useAsyncData(`content:battle-participation:${participationId}`, () =>
    queryContent<BattleParticipation>('/battle/data').where({
      _partial: true,
      _extension: 'json',
      id: participationId
    })
      .only(['id', 'name'])
      .findOne()
  )
}

export const useBattleParticipationsById = (participationsId: string[]) => {
  return useAsyncData(`content:battle-participations:${participationsId.join(':')}`, () =>
    queryContent<BattleParticipation>('/battle/data').where({
      _partial: true,
      _extension: 'json',
      id: {
        $in: participationsId
      }
    })
      .only(['id', 'name'])
      .find()
  )
}

export const useBattleBySchoolId = (schoolId: string) => {
  return useAsyncData(`content:battle:${schoolId}`, () =>
    queryContent<Association>('/associations-etudiantes/data').where({
      _partial: true,
      _extension: 'json',
      schoolsId: {
        $contains: schoolId
      }
    })
      .only(['battleParticipationsId'])
      .find()
  )
}

export const useBlogLastArticles = () => {
  return useAsyncData('content:blog:last-articles', () =>
    queryContent('/blog/')
      .where({
        categories: {
          $containsAny: ['tour asso']
        }
      })
      .sort({ datePublished: -1 })
      .limit(3)
      .find()
  )
}
