<script lang="ts">
import TableOfContentsItem from './NestedNavigationElement.svelte'
import type { NestedNavigationElementProps } from '$lib/types/navigation'

let { items }: NestedNavigationElementProps = $props()
</script>

<div class="table-of-contents">
  {#each items as item}
    <TableOfContentsItem {item} />
  {/each}
</div>

<style>
.table-of-contents {
  display: flex;
  flex-direction: column;

  font-size: var(--font-size-s);
}
</style>
