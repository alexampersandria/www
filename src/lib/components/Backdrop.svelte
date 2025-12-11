<script lang="ts">
import { page } from '$app/state'
import { SvelteURL } from 'svelte/reactivity'
import { fade } from 'svelte/transition'

let urlWithoutIdAndQuery = $derived.by(() => {
  let url = new SvelteURL(page.url.href)
  url.search = ''
  url.hash = ''
  return url.href
})

let routeSegments = $derived.by(() => {
  let segments = page.url.pathname.split('/').filter(Boolean)

  if (segments.length === 0) {
    segments.push('root')
  }
  if (page.url.hash) {
    segments.push(page.url.hash.replace('#', ''))
  }
  return segments.map(seg => {
    return seg.replaceAll(/[^a-zA-Z0-9 -]/g, '').toLowerCase()
  })
})
</script>

{#key urlWithoutIdAndQuery}
  <div
    in:fade={{ duration: 250 }}
    out:fade={{ duration: 250, delay: 250 }}
    class="backdrop {routeSegments.join(' ')}">
  </div>
{/key}

<style lang="scss">
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;

  &.root {
    background: linear-gradient(
      to bottom,
      var(--color-base-20),
      var(--color-base-40)
    );
  }

  &.resume {
    background: linear-gradient(
      to bottom,
      var(--color-base-10),
      var(--color-base-00)
    );
  }

  &.photography {
    background: linear-gradient(
      to bottom,
      var(--color-blue-10),
      var(--color-blue-30)
    );
  }

  &.music {
    background: linear-gradient(
      to bottom,
      var(--color-orange-10),
      var(--color-orange-30)
    );
  }

  &.projects {
    background: linear-gradient(
      to bottom,
      var(--color-pink-10),
      var(--color-pink-20)
    );

    &.diarycomputer {
      background: linear-gradient(
        to bottom,
        var(--color-base-05),
        var(--color-base-10)
      );
    }

    &.mitmediano {
      background: linear-gradient(
        to bottom,
        var(--color-green-00),
        var(--color-green-10)
      );
    }
  }

  &.unknown {
    background: linear-gradient(
      to bottom,
      var(--color-base-10),
      var(--color-base-20)
    );
  }
}
</style>
