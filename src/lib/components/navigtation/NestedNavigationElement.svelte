<script lang="ts">
import NestedNavigationElement from './NestedNavigationElement.svelte'
import type { NestedNavigationElementItemProps } from '$lib/types/navigation'

let { item, activeItem }: NestedNavigationElementItemProps = $props()

let active = $derived.by(() => {
  if (!activeItem) return false
  return item.href === activeItem.href
})
</script>

<div class="nested-navigation-item-wrapper">
  <a
    class="nested-navigation-item level-{item.level ?? 2}"
    href={item.href}
    class:active>
    {item.label}
  </a>
</div>

{#each item.children as child}
  <NestedNavigationElement item={child} {activeItem} />
{/each}

<style lang="scss">
.nested-navigation-item-wrapper {
  overflow: hidden;
  text-overflow: ellipsis;

  .nested-navigation-item {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &.level-1 {
      display: none;
    }

    @for $i from 1 through 6 {
      &.level-#{$i} {
        padding-left: calc(#{$i - 2} * 2ch);
      }
    }
  }
}
</style>
