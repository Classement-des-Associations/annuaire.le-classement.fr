import { Color } from '@/types'

export const useCategoryColor = (category: Color) => {
  switch (category) {
    case 'gray':
      return ref('bg-gray-100 text-gray-900')
    case 'red':
      return ref('bg-red-100 text-red-900')
    case 'orange':
      return ref('bg-orange-100 text-orange-900')
    case 'brown':
      return ref('bg-amber-100 text-amber-900')
    case 'yellow':
      return ref('bg-yellow-100 text-yellow-900')
    case 'green':
      return ref('bg-green-100 text-green-900')
    case 'blue':
      return ref('bg-blue-100 text-blue-900')
    case 'purple':
      return ref('bg-purple-100 text-purple-900')
    case 'pink':
      return ref('bg-pink-100 text-pink-900')
    default:
      return ref('bg-gray-100 text-gray-900')
  }
}
