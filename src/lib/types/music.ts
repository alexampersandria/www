import type { Link } from './link'

export type Release = {
  type: ReleaseType
  title: string
  artist: string
  releaseDate: string
  cover?: string
  tracks?: Track[]
  links?: Link[]
}

export type ReleaseType = 'album' | 'single' | 'ep' | 'remix'

export type Track = {
  title: string
  artist: string
  featuring?: string[]
  // duration in seconds
  duration?: number
}
