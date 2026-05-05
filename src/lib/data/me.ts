import type { Link } from './links'
import { links } from './links'

export type Me = {
  photo?: string
  name: string
  tagline?: string
  pronouns?: string[]
  birthday?: string
  links?: Link[]
  resumeLinks?: Link[]
  otherLinks?: Link[]
  phone?: string
  email?: string
}

const allowedLinks = ['GitHub', 'LinkedIn']
export const resumeLinks = links.filter(link => allowedLinks.includes(link.label))
export const otherLinks = links.filter(link => !allowedLinks.includes(link.label))

export const me: Me = {
  photo: 'me.webp',
  name: 'Liara Alexandria Brüchmann',
  tagline: 'Developer, musician, photographer',
  birthday: '1998-07-22',
  pronouns: ['she', 'it'],
  email: 'liarabruchmann@gmail.com',
  resumeLinks: resumeLinks,
  otherLinks: otherLinks,
  links: links,
}
