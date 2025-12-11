import { age } from '$lib/utils/age'
import { experience } from '$lib/utils/experience'
import type { Resume } from '../types/resume'

export const resume: Resume = {
  background: `${age} year old full stack developer from Copenhagen with more than ${experience} years of experience, both as a developer and in a lead role`,
  positions: [
    {
      company: 'Udviklings- og Forenklingsstyrelsen',
      roles: [
        {
          title: 'Frontend Lead',
          period: { from: 'December 2024', to: 'Present' },
        },
        {
          title: 'Frontend Developer',
          period: { from: 'March 2023', to: 'November 2024' },
        },
      ],
    },
    {
      company: 'Mediano',
      roles: [
        {
          title: 'Full Stack Developer + Creative Lead',
          period: {
            from: 'January 2021',
            to: 'February 2023',
          },
        },
      ],
    },
    {
      company: 'SimCorp',
      roles: [
        {
          title: 'Software Developer',
          period: {
            from: 'September 2019',
            to: 'December 2020',
          },
        },
      ],
    },
  ],
  education: [
    {
      institution: 'Aalborg University Copenhagen',
      degree: 'BSc IT, Communications & New Media',
      period: { from: 'August 2017', to: 'August 2019' },
      completed: false,
    },
  ],
}
