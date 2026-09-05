<script lang="ts">
import type { Link } from '$lib/shared/data/links'

let { href, label, target: targetProp }: Link = $props()

// if no target is specified, open external links in a new tab
const defaultTarget = $derived(href.startsWith('http') ? '_blank' : undefined)
const target = $derived(targetProp ?? defaultTarget)
</script>

<a {href} {target} class="link">
  {label}
</a>
