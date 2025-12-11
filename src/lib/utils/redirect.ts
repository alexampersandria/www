import { redirects } from '$lib/data/redirects'

export const redirectTo = (from: string) => {
  const foundRedirect = redirects.find(redirect => {
    const normalizedRedirect = redirect.from.replace(/\/$/, '')
    const normalizedFrom = from.replace(/\/$/, '')
    return normalizedRedirect === normalizedFrom
  })
  if (foundRedirect) {
    return foundRedirect.to
  }
}
