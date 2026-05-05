<script lang="ts">
import 'modern-normalize/modern-normalize.css'
import '$lib/assets/main.scss'
import favicon from '$lib/assets/favicon.svg'
import Navigation from '$lib/components/navigtation/Navigation.svelte'
import { page } from '$app/state'
import { fade } from 'svelte/transition'
import { fadein } from '$lib/actions/fadein.svelte'
import { generateTableOfContents } from '$lib/utils/toc'
import { afterNavigate, goto } from '$app/navigation'
import { redirectTo } from '$lib/utils/redirect'
import TableOfContents from '$lib/components/navigtation/TableOfContents.svelte'
import { IsMounted, ScrollState } from 'runed'
import { useThemeStore } from '$lib/stores/theme.store.svelte'
import { initStores } from '$lib/stores/index.svelte'

let { children } = $props()

initStores()

const themeStore = useThemeStore()

let main = $state<HTMLElement>()

let tableofcontents = $derived(main ? generateTableOfContents(main) : undefined)

afterNavigate(() => {
  const redirect = redirectTo(page.url.pathname)
  if (redirect) goto(redirect)
})

const isMounted = new IsMounted()

const scroll = new ScrollState({
  element: () => window,
})

let pagetitle = $derived.by(() => {
  let root = 'liara.io'
  let path = page.url.pathname

  if (path === '/') {
    return root
  }

  let firstSegment = path.split('/').filter(Boolean)[0]
  let lastSegment = path.split('/').filter(Boolean).pop()
  let segmentCount = path.split('/').filter(Boolean).length

  const formatSegment = (segment: string) => segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

  if (segmentCount === 1 && firstSegment) return `${formatSegment(firstSegment)} - ${root}`
  else if (lastSegment) return `${formatSegment(lastSegment)} - ${root}`
  else return root
})
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>{pagetitle}</title>
</svelte:head>

{#if isMounted}
  {@const animationDuration = 100}
  <div class="root theme-{themeStore.theme}" in:fade={{ duration: 50 }}>
    <div class="navigation-wrapper">
      <Navigation />
    </div>

    <div class="viewport">
      {#key page.route.id}
        <div
          class="content-wrapper"
          in:fade={{
            duration: animationDuration,
            delay: animationDuration,
          }}
          out:fade={{ duration: animationDuration }}>
          <main use:fadein bind:this={main}>
            {@render children()}
          </main>
        </div>
      {/key}
    </div>

    {#key page.route.id}
      <div
        class="tableofcontents-container"
        in:fade={{
          duration: animationDuration,
          delay: animationDuration,
        }}
        out:fade={{ duration: animationDuration }}>
        <TableOfContents {tableofcontents} {scroll} />
      </div>
    {/key}
  </div>
{/if}

<style lang="scss">
.root {
  .viewport {
    .content-wrapper {
      white-space: normal;
      padding-top: var(--navigation-top-clearance);
    }
  }
}
</style>
