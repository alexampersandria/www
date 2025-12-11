const startDate = '2019-09-01'

export const experience = (() => {
  const start = new Date(startDate)
  const today = new Date()
  let years = today.getFullYear() - start.getFullYear()
  const monthDiff = today.getMonth() - start.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < start.getDate())) {
    years--
  }
  return years
})()
