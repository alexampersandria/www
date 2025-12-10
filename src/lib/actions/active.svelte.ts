import { browser } from '$app/environment'
import { page } from '$app/state'

export const compareRoutes = (a: string, b: string) => {
  return a.replace(/\/$/, '') === b.replace(/\/$/, '')
}

export type ActiveOptions = {
  exact?: boolean
}

export const isActiveRoute = (route: string, options?: ActiveOptions) => {
  if (browser) {
    const relativeRoute = !route.startsWith('/')
    let absoluteUrl = page.url.href
    if (absoluteUrl.endsWith('/')) {
      absoluteUrl = absoluteUrl.slice(0, -1)
    }
    let absoluteHref: string | undefined = undefined
    if (relativeRoute) {
      absoluteHref = `${page.url.origin + page.url.pathname}${route}`
    } else {
      absoluteHref = `${page.url.origin}${route}`
    }
    const exactMatch = compareRoutes(absoluteHref, absoluteUrl)
    const fuzzyMatch =
      absoluteHref.startsWith(absoluteUrl) ||
      absoluteUrl.startsWith(absoluteHref)

    if (options?.exact || route === '/' || page.url.pathname === '/') {
      return exactMatch
    } else {
      return fuzzyMatch
    }
  }
}

export const active = (node: HTMLElement, options?: ActiveOptions) => {
  $effect(() => {
    const route = node.getAttribute('href')
    if (route) {
      if (isActiveRoute(route, options)) {
        node.classList.add('active')
      }
      return () => {
        node.classList.remove('active')
      }
    }
  })
}
