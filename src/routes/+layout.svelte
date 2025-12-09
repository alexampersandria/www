<script lang="ts">
import '$lib/assets/scss/main.scss'
import favicon from '$lib/assets/favicon.svg'
import Navigation from '$lib/components/Navigation.svelte'
import 'modern-normalize/modern-normalize.css'
import { page } from '$app/state'
import { fade } from 'svelte/transition'
import { fadein } from '$lib/actions/fadein.svelte'
import Backdrop from '$lib/components/Backdrop.svelte'

let { children } = $props()
let main = $state<HTMLElement>()

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

let urlWithoutIdAndQuery = $derived.by(() => {
  let url = new URL(page.url.href)
  url.search = ''
  url.hash = ''
  return url.href
})

let animationDuration = () => {
  try {
    let minWidth = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--navigation-min-width')

    if (minWidth.trim() === '0px') {
      return 300
    } else {
      return 100
    }
  } catch {
    return 100
  }
}
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Backdrop />

<div class="root">
  <div class="navigation-wrapper">
    <Navigation {main} />
  </div>

  <div class="viewport">
    {#key urlWithoutIdAndQuery}
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
  --content-max-width: var(--container-width);

  .viewport {
    height: 100dvh;
    width: 100dvw;
    overflow: auto;
  }

  .content-wrapper {
    padding-inline: var(--padding-l);
    white-space: normal;
    max-width: var(--content-max-width);

    padding-top: var(--navigation-top-clearance);

    margin-left: max(
      calc(50vw - var(--content-max-width) / 2),
      var(--navigation-min-width)
    );

    main {
      padding-block: var(--padding-l);
      padding-bottom: min(25vh, var(--block-size-xxs));
    }
  }
}
</style>
