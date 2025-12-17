import { resume } from '$lib/data/resume'
import type { CurrentPosition } from '$lib/types/resume'

const currentPosition = resume.positions.find(position =>
  position.roles.some(role => role.period.to === 'Present'),
)

const currentRole = currentPosition?.roles.find(
  role => role.period.to === 'Present',
)

export const currentJob: CurrentPosition | undefined =
  currentPosition && currentRole
    ? { company: currentPosition.company, role: currentRole }
    : undefined
