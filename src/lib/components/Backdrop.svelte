<script lang="ts">
import { page } from '$app/state'
import { SvelteURL } from 'svelte/reactivity'
import { fade } from 'svelte/transition'
import noisemap from '$lib/assets/img/noisemap.webp'

let { noise = false } = $props()

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

  {#if noise}
    <div class="noise" style="background-image: url('{noisemap}');"></div>
  {/if}
</div>

<style lang="scss">
.backdrop-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;

  .noise {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: repeat;
    background-size: 1024px 1024px;

    @keyframes semiRandomlyMoveBackgroundPosition {
      0% {
        background-position: 0% 0%;
      }
      10% {
        background-position: 74% 5%;
      }
      20% {
        background-position: 20% 40%;
      }
      30% {
        background-position: 90% 80%;
      }
      40% {
        background-position: 10% 20%;
      }
      50% {
        background-position: 50% 90%;
      }
      60% {
        background-position: 30% 10%;
      }
      70% {
        background-position: 80% 30%;
      }
      80% {
        background-position: 40% 70%;
      }
      90% {
        background-position: 60% 40%;
      }
      100% {
        background-position: 0% 0%;
      }
    }

    animation: semiRandomlyMoveBackgroundPosition 0.5s steps(1) infinite;
    mix-blend-mode: soft-light;
    opacity: 5%;
  }

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
