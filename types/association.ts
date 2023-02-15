import { Category } from './category'
import { Participation } from './participation'
import { School } from './school'

export interface Association {
  id: string
  name: string
  description: string
  categoryId: string,
  category: Category
  linkedin: string
  instagram: string
  website: string,
  schoolsIds: string[]
  schools: Pick<School, 'id' | 'name'>[]
  participationIds: string[]
  participations: Participation[]
}
