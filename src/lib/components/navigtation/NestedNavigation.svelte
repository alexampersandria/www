<script lang="ts">
import NestedNavigationElement from './NestedNavigationElement.svelte'
import type { NestedNavigationElementProps } from '$lib/types/navigation'

let { items, activeItem }: NestedNavigationElementProps = $props()
</script>

<div class="nested-navigation">
  {#each items as item}
    <NestedNavigationElement {item} {activeItem} />
  {/each}
</div>

<style>
.nested-navigation {
  display: flex;
  flex-direction: column;
}
</style>
