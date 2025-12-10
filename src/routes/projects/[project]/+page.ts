import { projects } from '$lib/data/projects'
import type { PageLoad } from './$types'

export const load: PageLoad = ({ params }) => {
  const project = projects.find(project => project.id === params.project)

  return {
    id: params.project,
    project,
  }
}
