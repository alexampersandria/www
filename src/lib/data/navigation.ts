import type { Link } from '$lib/types/link'
import { projectsAsNavigationElements } from './projects'

export const navigation: NavigationElement[] = [
  { label: 'Root', href: '/' },
  {
    label: 'Projects',
    href: '/projects',
    children: projectsAsNavigationElements,
  },
  { label: 'Resume', href: '/resume' },
  { label: 'Photography', href: '/photography' },
  { label: 'Music', href: '/music' },
]

export type NavigationElement = Link & {
  children?: NavigationElement[]
}
