<script lang="ts">
import type { Link } from '$lib/types/link'

let { href, label, target }: Link = $props()

// if no target is specified, open external links in a new tab
const defaultTarget = $derived.by(() => {
  return href.startsWith('http') ? '_blank' : '_self'
})
</script>

<a {href} target={target ?? defaultTarget} class="link">
  {label}
</a>
