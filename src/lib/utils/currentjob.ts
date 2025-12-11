import { resume } from '$lib/data/resume'
import type { CurrentPosition } from '$lib/types/resume'

const currentPosition = resume.positions.find(position =>
  position.roles.some(role => role.period.to === 'Present'),
)
export const currentJob: CurrentPosition = {
  company: currentPosition?.company,
  role: currentPosition?.roles.find(role => role.period.to === 'Present'),
}
