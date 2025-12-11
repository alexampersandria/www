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

<div class="backdrop-wrapper">
  {#key urlWithoutIdAndQuery}
    <div
      in:fade={{ duration: 250 }}
      out:fade={{ duration: 250, delay: 250 }}
      class="backdrop {routeSegments.join(' ')}">
    </div>
  {/key}
</div>

<style lang="scss">
.backdrop-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;

  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &.root {
      --pulse-length: 10s;

      background: linear-gradient(
        to bottom,
        var(--color-base-20),
        var(--color-base-40)
      );

      &:after,
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-repeat: repeat;
        background-size: contain;
      }

      &:after {
        background: linear-gradient(
          to bottom,
          var(--color-pink-40),
          var(--color-purple-80)
        );
        mask-image: linear-gradient(
          to left,
          rgba(0, 0, 0, 1) 0%,
          rgba(0, 0, 0, 0) 100%
        );
        opacity: 0.2;
        animation: opacityPulse var(--pulse-length) infinite;
      }

      &:before {
        background: linear-gradient(
          to bottom,
          var(--color-blue-40),
          var(--color-base-70)
        );
        mask-image: linear-gradient(
          to top right,
          rgba(0, 0, 0, 1) 0%,
          rgba(0, 0, 0, 0) 100%
        );
        opacity: 0.2;
        animation: opacityPulse var(--pulse-length)
          calc(var(--pulse-length) / -2) infinite;
      }

      @keyframes opacityPulse {
        0%,
        100% {
          opacity: 0.05;
        }
        50% {
          opacity: 0.3;
        }
      }
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
}
</style>
