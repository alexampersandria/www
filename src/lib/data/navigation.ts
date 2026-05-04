import type { Link } from '$lib/types/link'

export const navigation: NavigationElement[] = [
  {
    label: 'Who am I?',
    href: '/',
  },
  {
    label: 'Projects',
    href: '/projects',
  },
  { label: 'Resume', href: '/resume' },
  // { label: 'Photography', href: '/photography' },
  { label: 'Music', href: '/music' },
]

export type NavigationElement = Link & {
  children?: NavigationElement[]
}
