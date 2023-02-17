import { Association, Category, School } from '@/types'

export const useAssociations = () => {
  return useAsyncData('content:associations', () =>
    queryContent<Association>('/associations-etudiantes/data').where({
      _partial: true,
      _extension: 'json'
    }).find()
  )
}

export const useAssociationsByCategory = (categoryId: string) => {
  return useAsyncData(`content:associations:${categoryId}`, () =>
    queryContent<Association>('/associations-etudiantes/data').where({
      _partial: true,
      _extension: 'json',
      categoryId
    }).find()
  )
}

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

export const useCategories = () => {
  return useAsyncData('content:categories', () =>
    queryContent<Category>('/categories/data').where({
      _partial: true,
      _extension: 'json'
    }).find()
  )
}

export const useCategory = (categoryId: string) => {
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

export const useSchool = (schoolId: string) => {
  return useAsyncData(`content:school:${schoolId}`, () =>
    queryContent<School>('/ecoles/data').where({
      _partial: true,
      _extension: 'json',
      id: schoolId
    }).findOne()
  )
}
