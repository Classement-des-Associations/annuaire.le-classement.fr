import { Category } from './category'
import { ContestParticipation } from './contest-participation'
import { BattleParticipation } from './battle-participation'
import { School } from './school'

export interface Association {
  id: string
  name: string
  description: string
  linkedin: string
  instagram: string
  website: string,
  categoriesId: string[],
  schoolsId: string[]
  contestParticipationsId: string[],
  battleParticipationsId: string[],
  categories: Category[],
  schools: School[],
  contestParticipations: ContestParticipation[],
  battleParticipations: BattleParticipation[]
}
