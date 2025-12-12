<script lang="ts">
import { active } from '$lib/actions/active.svelte'
import NestedNavigationElement from './NestedNavigationElement.svelte'
import type { NestedNavigationElementItemProps } from '$lib/types/navigation'

let { item }: NestedNavigationElementItemProps = $props()
</script>

<a
  class="nested-navigation-item level-{item.level ?? 2}"
  href={item.href}
  use:active={{ exact: true }}>
  {item.label}
</a>

{#each item.children as child}
  <NestedNavigationElement item={child} />
{/each}

<style lang="scss">
.nested-navigation-item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &.level-1 {
    display: none;
  }

  @for $i from 1 through 6 {
    &.level-#{$i} {
      padding-left: #{$i - 2}ch;
    }
  }
}
</style>
