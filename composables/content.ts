import { Association, Category, Participation, School } from '@/types'

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
      .only(['id', 'name', 'categories'])
      .find()
  )
}

export const useAssociationsByParticipationId = (participationId: string) => {
  return useAsyncData(`content:associations:${participationId}`, () =>
    queryContent<Association>('/associations-etudiantes/data').where({
      _partial: true,
      _extension: 'json',
      participationsId: {
        $contains: participationId
      }
    })
      .only(['id', 'name', 'categories'])
      .find()
  )
}

export const useRelatedAssociations = (associationId: string, categoriesId: string[]) => {
  console.log(categoriesId)
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
      .only(['id', 'name', 'icon', 'color'])
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

export const useParticipations = () => {
  return useAsyncData('content:participations', () =>
    queryContent<Participation>('/participations-concours/data').where({
      _partial: true,
      _extension: 'json'
    })
      .only(['id', 'name'])
      .find()
  )
}

export const useParticipationById = (participationId: string) => {
  return useAsyncData(`content:participation:${participationId}`, () =>
    queryContent<Participation>('/participations-concours/data').where({
      _partial: true,
      _extension: 'json',
      id: participationId
    })
      .only(['id', 'name'])
      .findOne()
  )
}

export const useParticipationsById = (participationsId: string[]) => {
  return useAsyncData(`content:participations:${participationsId.join(':')}`, () =>
    queryContent<Participation>('/participations-concours/data').where({
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
