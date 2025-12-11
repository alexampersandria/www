import { me } from '../data/me'

const birthdayDate = new Date(me.birthday ?? '')
export const age = (() => {
  if (!me.birthday) return 0
  const today = new Date()
  let age = today.getFullYear() - birthdayDate.getFullYear()
  const monthDiff = today.getMonth() - birthdayDate.getMonth()
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthdayDate.getDate())
  ) {
    age--
  }
  return age
})()
