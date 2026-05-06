import { resume } from '$lib/shared/data/resume'
import type { CurrentPosition } from '$lib/shared/data/resume'

export const currentPosition = resume.positions.find(position =>
  position.roles.some(role => role.period.to === 'Present'),
)

export const currentRole = currentPosition?.roles.find(role => role.period.to === 'Present')

export const currentJob: CurrentPosition | undefined =
  currentPosition && currentRole ? { company: currentPosition.company, role: currentRole } : undefined
