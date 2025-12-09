export type Resume = {
  background?: string
  positions: Position[]
  education: Education[]
}

export type Period = {
  from: string
  to: string | 'Present'
}

export type Position = {
  company: string
  roles: Role[]
}

export type Role = {
  title: string
  period: Period
  description?: string
}

export type Education = {
  institution: string
  degree: string
  period: Period
  completed?: boolean
}
