<script lang="ts">
import NestedNavigationElement from '$lib/components/navigation/NestedNavigationElement.svelte'
import type { NestedNavigationElementProps } from '$lib/shared/data/navigation'

let { items, activeItem }: NestedNavigationElementProps = $props()
</script>

<div class="nested-navigation">
  {#each items as item}
    <NestedNavigationElement {item} {activeItem} />
  {/each}
</div>

<style lang="scss">
.nested-navigation {
  display: flex;
  flex-direction: column;
}
</style>
