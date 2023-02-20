import { Association, Category, Participation, School } from '@/types'

export const useAssociations = () => {
  return useAsyncData('content:associations', () =>
    queryContent<Association>('/associations-etudiantes/data').where({
      _partial: true,
      _extension: 'json'
    }).find()
  )
}

export const useAssociationById = (associationId: string) => {
  return useAsyncData(`content:association:${associationId}`, () =>
    queryContent<Association>('/associations-etudiantes/data').where({
      _partial: true,
      _extension: 'json',
      id: associationId
    }).findOne()
  )
}

// TODO: rename to useAssociationsByCategoryId
export const useAssociationsByCategory = (categoryId: string) => {
  return useAsyncData(`content:associations:${categoryId}`, () =>
    queryContent<Association>('/associations-etudiantes/data').where({
      _partial: true,
      _extension: 'json',
      categoryId
    }).find()
  )
}

// TODO: rename to useAssociationsBySchoolId
export const useAssociationsBySchool = (schoolId: string) => {
  return useAsyncData(`content:associations:${schoolId}`, () =>
    queryContent<Association>('/associations-etudiantes/data').where({
      _partial: true,
      _extension: 'json',
      schoolsId: {
        $contains: schoolId
      }
    }).find()
  )
}

export const useRelatedAssociationsByCategoryId = (categoryId: string) => {
  return useAsyncData(`content:associations:related:${categoryId}`, () =>
    queryContent<Association>('/associations-etudiantes/data').where({
      _partial: true,
      _extension: 'json',
      id: {
        $ne: categoryId
      },
      categoryId: {
        $eq: categoryId
      }
    })
      .limit(3)
      .find()
  )
}

export const useCategories = () => {
  return useAsyncData('content:categories', () =>
    queryContent<Category>('/categories/data').where({
      _partial: true,
      _extension: 'json'
    }).find()
  )
}

export const useCategoryById = (categoryId: string) => {
  return useAsyncData(`content:category:${categoryId}`, () =>
    queryContent<Category>('/categories/data').where({
      _partial: true,
      _extension: 'json',
      id: categoryId
    }).findOne()
  )
}

export const useSchools = () => {
  return useAsyncData('content:schools', () =>
    queryContent<School>('/ecoles/data').where({
      _partial: true,
      _extension: 'json'
    }).find()
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
    }).find()
  )
}

export const useSchoolById = (schoolId: string) => {
  return useAsyncData(`content:school:${schoolId}`, () =>
    queryContent<School>('/ecoles/data').where({
      _partial: true,
      _extension: 'json',
      id: schoolId
    }).findOne()
  )
}

export const useParticipations = () => {
  return useAsyncData('content:participations', () =>
    queryContent<Participation>('/participations/data').where({
      _partial: true,
      _extension: 'json'
    }).find()
  )
}

export const useParticipationsById = (participationsId: string[]) => {
  return useAsyncData(`content:participations:${participationsId.join(':')}`, () =>
    queryContent<Participation>('/participations/data').where({
      _partial: true,
      _extension: 'json',
      id: {
        $in: participationsId
      }
    }).find()
  )
}
