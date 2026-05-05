<script lang="ts">
import 'modern-normalize/modern-normalize.css'
import '$lib/assets/main.scss'
import Navigation from '$lib/views/navigation/Navigation.svelte'
import { page } from '$app/state'
import { fade } from 'svelte/transition'
import { fadein } from '$lib/actions/fadein.svelte'
import { generateTableOfContents } from '$lib/utils/toc'
import { afterNavigate, goto } from '$app/navigation'
import { redirectTo } from '$lib/utils/redirect'
import TableOfContents from '$lib/components/navigation/TableOfContents.svelte'
import { IsMounted, ScrollState, watch } from 'runed'
import { useThemeStore } from '$lib/stores/theme.store.svelte'
import { initStores } from '$lib/stores/index.svelte'
import faviconPaper from '$lib/assets/favicons/paper.svg'
import faviconMoon from '$lib/assets/favicons/moon.svg'
import faviconLavender from '$lib/assets/favicons/lavender.svg'
import faviconForest from '$lib/assets/favicons/forest.svg'
import faviconCornflower from '$lib/assets/favicons/cornflower.svg'
import faviconCampfire from '$lib/assets/favicons/campfire.svg'

let { children } = $props()

initStores()
const themeStore = useThemeStore()

const animationDuration = 100
let main = $state<HTMLElement>()
let tableofcontents = $derived(main ? generateTableOfContents(main) : undefined)

const isMounted = new IsMounted()
const scroll = new ScrollState({
  element: () => window,
})

let pagetitle = $derived.by(() => {
  const root = 'Liara'
  const pagetitle = page.url.pathname
    .split('/')
    .filter(Boolean)
    .at(-1)
    ?.replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
  return pagetitle ? `${pagetitle} / ${root}` : root
})

let favicon = $state(faviconPaper)

watch(
  () => themeStore.theme,
  theme => {
    if (theme === 'paper') favicon = faviconPaper
    else if (theme === 'moon') favicon = faviconMoon
    else if (theme === 'lavender') favicon = faviconLavender
    else if (theme === 'forest') favicon = faviconForest
    else if (theme === 'cornflower') favicon = faviconCornflower
    else if (theme === 'campfire') favicon = faviconCampfire
  },
)

afterNavigate(() => {
  const redirect = redirectTo(page.url.pathname)
  if (redirect) goto(redirect)
})
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>{pagetitle}</title>
</svelte:head>

{#if isMounted}
  <div class="root theme-{themeStore.theme}" in:fade={{ duration: 50 }}>
    <div class="navigation-wrapper">
      <Navigation />
    </div>

    <div class="viewport">
      {#key page.route.id}
        <div
          class="content-wrapper"
          in:fade={{ duration: animationDuration, delay: animationDuration }}
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
        in:fade={{ duration: animationDuration, delay: animationDuration }}
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
