<script lang="ts">
import TableOfContentsItem from './NestedNavigationElement.svelte'
import type { NestedNavigationElementProps } from '$lib/types/navigation'

let { items }: NestedNavigationElementProps = $props()
</script>

<div class="nested-navigation">
  {#each items as item}
    <TableOfContentsItem {item} />
  {/each}
</div>

<style>
.nested-navigation {
  display: flex;
  flex-direction: column;
}
</style>
