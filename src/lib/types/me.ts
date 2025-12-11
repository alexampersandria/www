import type { Link } from './link'

export type Me = {
  photo?: string
  name: string
  pronouns?: string[]
  birthday?: string
  links?: Link[]
  phone?: string
  email?: string
}
