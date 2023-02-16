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
  return useAsyncData('content:associations', () =>
    queryContent<Association>('/associations-etudiantes/data').where({
      _partial: true,
      _extension: 'json',
      categoryId
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

export const useSchools = () => {
  return useAsyncData('content:schools', () =>
    queryContent<School>('/ecoles/data').where({
      _partial: true,
      _extension: 'json'
    }).find()
  )
}
