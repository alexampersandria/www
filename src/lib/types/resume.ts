export type Resume = {
  background?: string
  positions: Position[]
  education: Education[]
}

export type CurrentPosition = {
  company: Company
  role: Role
}

export type Period = {
  from: string
  to: string | 'Present'
}

export type Position = {
  company: Company
  roles: Role[]
}

export type Company = {
  name: string
  href?: string
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
