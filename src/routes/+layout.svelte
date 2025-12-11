<script lang="ts">
import '$lib/assets/scss/main.scss'
import favicon from '$lib/assets/favicon.svg'
import Navigation from '$lib/components/Navigation.svelte'
import 'modern-normalize/modern-normalize.css'
import { page } from '$app/state'
import { fade } from 'svelte/transition'
import { fadein } from '$lib/actions/fadein.svelte'
import Backdrop from '$lib/components/Backdrop.svelte'
import { generateTableOfContents } from '$lib/utils/toc'
import { afterNavigate, goto } from '$app/navigation'
import { redirectTo } from '$lib/utils/redirect'

let { children } = $props()
let main = $state<HTMLElement>()

let tableofcontents = $derived.by(() => {
  return main ? generateTableOfContents(main) : undefined
})

let routeClass = $derived.by(() => {
  if (page.route.id) {
    let routeString = `${page.route.id.replace(/\//g, '-').replace(/^\-/, '')}`
    if (routeString === '' || routeString === '-') {
      routeString = 'root'
    }
    return `route-${routeString}`
  }
  return ''
})

let animationDuration = () => {
  const long = 300
  const short = 100
  try {
    let minWidth = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--navigation-min-width')

    if (minWidth.trim() === '0px') {
      return long
    } else {
      return short
    }
  } catch {
    return short
  }
}

afterNavigate(() => {
  const redirect = redirectTo(page.url.pathname)
  if (redirect) {
    goto(redirect)
  }
})
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Backdrop />

<div class="root">
  <div class="navigation-wrapper">
    <Navigation {tableofcontents} />
  </div>

  <div class="viewport">
    {#key page.route.id}
      <div
        class="route {routeClass}"
        in:fade={{ duration: animationDuration(), delay: animationDuration() }}
        out:fade={{ duration: animationDuration() }}>
        <div class="content-wrapper">
          <main use:fadein bind:this={main}>
            {@render children()}
          </main>
        </div>
      </div>
    {/key}
  </div>
</div>

<style lang="scss">
.root {
  .viewport {
    height: 100dvh;
    width: 100dvw;
    overflow: auto;

    // don't show scrollbars when navigating
    &:not(:has(.route:only-child)) {
      overflow: hidden;
    }
  }

  .content-wrapper {
    white-space: normal;
    padding-top: var(--navigation-top-clearance);
  }
}
</style>
