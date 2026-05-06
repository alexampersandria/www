<script lang="ts">
import type { Company } from '$lib/shared/data/resume'

let { name, href }: Company = $props()
</script>

<svelte:element
  this={href ? 'a' : 'span'}
  {href}
  target={href ? '_blank' : undefined}
  rel={href ? 'noopener noreferrer' : undefined}>
  {name}
</svelte:element>
