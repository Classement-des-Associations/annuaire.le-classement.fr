import { Association } from "./association"

export type School = {
  id: string
  name: string
  associations: Pick<Association, 'id' | "name" | "category">[]
}
