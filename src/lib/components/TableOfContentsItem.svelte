<script lang="ts">
import { active } from '$lib/actions/active.svelte'
import TableOfContentsItem from './TableOfContentsItem.svelte'

let { item } = $props()
</script>

<a
  class="table-of-contents-item level-{item.level}"
  href="#{item.id}"
  use:active>
  {item.title}
</a>

{#each item.children as child}
  <TableOfContentsItem item={child} />
{/each}

<style lang="scss">
.table-of-contents-item {
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
