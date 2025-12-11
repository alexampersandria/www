import type { Link } from '$lib/types/link'
import type { Period } from '$lib/types/resume'
import type { NavigationElement } from './navigation'

export type Project = {
  title: string
  description?: string
  id: string
  period?: Period
  links?: Link[]
}

export const projects: Project[] = [
  {
    title: 'diary.computer',
    description:
      'Mood tracker & micro-journaling platform written in Rust & Svelte',
    id: 'diary.computer',
    period: {
      from: 'February 2024',
      to: 'Present',
    },
    links: [
      { label: 'Website', href: 'https://diary.computer' },
      {
        label: 'GitHub',
        href: 'https://github.com/alexampersandria/diary.computer',
      },
    ],
  },
  {
    title: 'Mit Mediano',
    description: 'Podcast platform',
    id: 'mit.mediano',
    period: {
      from: 'October 2022',
      to: 'February 2025',
    },
  },
  {
    title: 'liara.io (old)',
    description: 'Old personal website written in Vue',
    id: 'old.liara.io',
    links: [
      { label: 'Archived Website', href: 'https://old.liara.io' },
      {
        label: 'GitHub',
        href: 'https://github.com/alexampersandria/old.liara.io',
      },
    ],
    period: {
      from: 'July 2022',
      to: 'Present',
    },
  },
]

export const projectsAsNavigationElements: NavigationElement[] = projects.map(
  project => ({
    label: project.title,
    href: `/projects/${project.id}`,
  }),
)
