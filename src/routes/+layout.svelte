<script lang="ts">
import 'modern-normalize/modern-normalize.css'
import '$lib/assets/scss/main.scss'
import favicon from '$lib/assets/favicon.svg'
import Navigation from '$lib/components/navigtation/Navigation.svelte'
import { page } from '$app/state'
import { fade } from 'svelte/transition'
import { fadein } from '$lib/actions/fadein.svelte'
import Backdrop from '$lib/components/layout/Backdrop.svelte'
import { generateTableOfContents } from '$lib/utils/toc'
import { afterNavigate, goto } from '$app/navigation'
import { redirectTo } from '$lib/utils/redirect'
import { onMount } from 'svelte'
import TableOfContents from '$lib/components/navigtation/TableOfContents.svelte'
import { ScrollState } from 'runed'

let { children } = $props()
let main = $state<HTMLElement>()
let viewport = $state<HTMLElement>()

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

const scroll = new ScrollState({
  element: () => viewport,
})

let pagetitle = $derived.by(() => {
  let root = 'liara.io'
  let path = page.url.pathname
  let firstSegment = path.split('/').filter(Boolean)[0]
  let lastSegment = path.split('/').filter(Boolean).pop()
  let segmentCount = path.split('/').filter(Boolean).length

  if (segmentCount === 1 && firstSegment) {
    let formattedSegment = firstSegment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
    return `${formattedSegment} - ${root}`
  } else if (tableofcontents?.title) {
    return `${tableofcontents.title} - ${root}`
  } else if (lastSegment) {
    let formattedSegment = lastSegment.replace(/-/g, ' ')
    return `${formattedSegment} - ${root}`
  } else {
    return root
  }
})
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>{pagetitle}</title>
</svelte:head>

<Backdrop />

{#if mounted}
  <div class="root" in:fade={{ duration: 50 }}>
    <div class="navigation-wrapper">
      <Navigation />
    </div>

    <div class="viewport" bind:this={viewport}>
      {#key page.route.id}
        {@const animationDuration = 100}
        <div
          class="route {routeClass}"
          in:fade={{
            duration: animationDuration,
            delay: animationDuration,
          }}
          out:fade={{ duration: animationDuration }}>
          <div class="content-wrapper">
            <main use:fadein bind:this={main}>
              {@render children()}
            </main>
          </div>
        </div>
      {/key}
    </div>

    <div class="toc-wrapper">
      <TableOfContents {tableofcontents} {scroll} />
    </div>
  </div>
{/if}

<style lang="scss">
.root {
  .viewport {
    max-height: 100vh;
    overflow: auto;

    // don't show scrollbars when navigating
    &:not(:has(.route:only-child)) {
      overflow: hidden;
    }

    .content-wrapper {
      white-space: normal;
      padding-top: var(--navigation-top-clearance);
    }
  }
}
</style>
