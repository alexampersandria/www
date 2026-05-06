export const formatSeconds = (seconds: number): string => {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor(seconds / 3600)
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  let formatted = ''
  const addUnit = (value: number, unit: string) => {
    if (value > 0) {
      if (formatted.length > 0) {
        formatted += ' '
      }
      formatted += `${value}${unit}`
    }
  }

  addUnit(days, 'd')
  addUnit(hours, 'h')
  addUnit(mins, 'm')
  addUnit(secs, 's')

  return formatted || '0s'
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)

  const year = date.getUTCFullYear()
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const day = date.getUTCDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}
