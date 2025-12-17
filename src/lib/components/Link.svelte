<script lang="ts">
import type { Link } from '$lib/types/link'
import { Disc3, Github } from 'lucide-svelte'

let {
  href,
  label,
  target,
  icon = false,
}: Link & {
  icon?: boolean
} = $props()

const Icon = $derived.by(() => {
  if (!icon) return null
  if (href.includes('github.com')) {
    return Github
  } else if (href.includes('bandcamp.com')) {
    return Disc3
  }
})

// if no target is specified, open external links in a new tab
const defaultTarget = $derived.by(() => {
  return href.startsWith('http') ? '_blank' : '_self'
})
</script>

<a {href} target={target ?? defaultTarget} class="link">
  {#if Icon}
    <div class="link-icon">
      <Icon />
    </div>
  {/if}
  <div class="link-label">
    {label}
  </div>
</a>

<style lang="scss">
.link {
  display: inline-block;

  .link-icon {
    flex-shrink: 0;
  }

  .link-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
