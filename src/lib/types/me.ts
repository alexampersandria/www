import type { Link } from './link'

export type Me = {
  photo?: string
  name: string
  pronouns?: string[]
  links?: Link[]
  phone?: string
  email?: string
}
