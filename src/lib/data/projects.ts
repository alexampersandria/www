import type { Link } from '$lib/types/link'
import type { NavigationElement } from './navigation'

export type Project = {
  title: string
  description?: string
  id: string
  links?: Link[]
}

export const projects: Project[] = [
  {
    title: 'diary.computer',
    description: 'mood tracker & micro-journaling — written in Rust & Svelte',
    id: 'diary.computer',
    links: [
      { label: 'Website', href: 'https://diary.computer' },
      {
        label: 'GitHub',
        href: 'https://github.com/alexampersandria/diary.computer',
      },
    ],
  },
]

export const projectsAsNavigationElements: NavigationElement[] = projects.map(
  project => ({
    label: project.title,
    href: `/projects/${project.id}`,
  }),
)
