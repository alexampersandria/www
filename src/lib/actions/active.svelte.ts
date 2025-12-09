import { browser } from '$app/environment'
import { page } from '$app/state'

export const compareRoutes = (a: string, b: string) => {
  return a.replace(/\/$/, '') === b.replace(/\/$/, '')
}

export const isActiveRoute = (route: string) => {
  if (browser) {
    const directMatch = compareRoutes(route, page.url.pathname)
    if (route.includes('#')) {
      const hashMatch = compareRoutes(route, page.url.hash)
      return directMatch || hashMatch
    } else {
      return directMatch
    }
  }
}

export const active = (node: HTMLElement) => {
  $effect(() => {
    const route = node.getAttribute('href')
    if (route) {
      if (isActiveRoute(route)) {
        node.classList.add('active')
      }
      return () => {
        node.classList.remove('active')
      }
    }
  })
}
