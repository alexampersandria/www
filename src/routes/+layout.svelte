<script lang="ts">
import 'modern-normalize/modern-normalize.css'
import '$lib/assets/scss/main.scss'
import favicon from '$lib/assets/favicon.svg'
import Navigation from '$lib/components/Navigation.svelte'
import { page } from '$app/state'
import { fade } from 'svelte/transition'
import { fadein } from '$lib/actions/fadein.svelte'
import Backdrop from '$lib/components/Backdrop.svelte'
import { generateTableOfContents } from '$lib/utils/toc'
import { afterNavigate, goto } from '$app/navigation'
import { redirectTo } from '$lib/utils/redirect'
import { onMount } from 'svelte'

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

let mounted = $state(false)
onMount(() => {
  mounted = true
})
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Backdrop />

{#if mounted}
  <div class="root" in:fade={{ duration: 50 }}>
    <div class="navigation-wrapper">
      <Navigation {tableofcontents} />
    </div>

    <div class="viewport">
      {#key page.route.id}
        <div
          class="route {routeClass}"
          in:fade={{
            duration: animationDuration(),
            delay: animationDuration(),
          }}
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
{/if}

<style lang="scss">
.root {
  .viewport {
    // don't show scrollbars when navigating
    &:not(:has(.route:only-child)) {
      max-height: 100vh;
      overflow: hidden;
    }
  }

  .content-wrapper {
    white-space: normal;
    padding-top: var(--navigation-top-clearance);
  }
}
</style>
