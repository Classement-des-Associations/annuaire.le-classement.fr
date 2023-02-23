import { Category } from './category'
import { Participation } from './participation'
import { School } from './school'

export interface Association {
  id: string
  name: string
  description: string
  linkedin: string
  instagram: string
  website: string,
  categoryId: string,
  schoolsId: string[]
  participationsId: string[],
  categories: Category[],
  schools: School[],
  participations: Participation[]
}
