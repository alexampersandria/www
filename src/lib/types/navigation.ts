import type { NavigationElement } from '$lib/data/navigation'

export type NestedNavigationItem = NavigationElement & {
  level?: number
  children?: NestedNavigationItem[]
}

export type NestedNavigationElementProps = {
  items: NestedNavigationItem[]
}

export type NestedNavigationElementItemProps = {
  item: NestedNavigationItem
}
