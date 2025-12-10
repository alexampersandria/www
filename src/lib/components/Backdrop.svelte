<script lang="ts">
import { page } from '$app/state'
import { fade } from 'svelte/transition'

let route = $derived.by(() => {
  const firstRouteSegment = page.url.pathname.split('/')[1]

  switch ('/' + firstRouteSegment) {
    case '/':
      return 'root'
    case '/resume':
      return 'resume'
    case '/photography':
      return 'photography'
    case '/music':
      return 'music'
    case '/projects':
      return 'projects'
    default:
      return 'unknown'
  }
})
</script>

{#key route}
  <div
    in:fade={{ duration: 250 }}
    out:fade={{ duration: 250, delay: 500 }}
    class="backdrop {route}">
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
      var(--color-blue-10),
      var(--color-blue-30)
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
      var(--color-purple-10),
      var(--color-purple-30)
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
      var(--color-base-00),
      var(--color-base-10)
    );
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
