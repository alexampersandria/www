import type { Link } from '$lib/shared/data/links'

export type NavigationElement = Link & {
  children?: NavigationElement[]
}

export type NestedNavigationItem = NavigationElement & {
  level?: number
  children?: NestedNavigationItem[]
}

export type NestedNavigationElementProps = {
  items: NestedNavigationItem[]
  activeItem?: NestedNavigationItem | null
}

export type NestedNavigationElementItemProps = {
  item: NestedNavigationItem
  activeItem?: NestedNavigationItem | null
}

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
  { label: 'Blog', href: '/blog' },
]
