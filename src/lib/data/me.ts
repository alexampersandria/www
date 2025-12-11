import type { Me } from '$lib/types/me'
import { links } from './links'

const allowedLinks = ['GitHub', 'LinkedIn']
export const resumeLinks = links.filter(link =>
  allowedLinks.includes(link.label),
)

export const me: Me = {
  photo: 'me.webp',
  name: 'Liara Alexandria Brüchmann',
  birthday: '1998-07-22',
  pronouns: ['she', 'it'],
  email: 'liarabruchmann@gmail.com',
  resumeLinks: resumeLinks,
  links: links,
}
