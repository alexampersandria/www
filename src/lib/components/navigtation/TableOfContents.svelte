<script lang="ts">
import type { NestedNavigationItem } from '$lib/types/navigation'
import {
  tableOfContentsItemToNavigationItem,
  type TableOfContents,
  type TableOfContentsItem,
} from '$lib/utils/toc'
import { ListTree } from 'lucide-svelte'
import NestedNavigation from './NestedNavigation.svelte'
import { fadein } from '$lib/actions/fadein.svelte'
import type { ScrollState } from 'runed'

let {
  tableofcontents,
  scroll,
}: { tableofcontents?: TableOfContents; scroll: ScrollState } = $props()

let tocnav: NestedNavigationItem[] = $derived.by(() => {
  return (
    tableofcontents?.items.map(item => {
      return tableOfContentsItemToNavigationItem(item)
    }) ?? []
  )
})

let totalElements = $derived.by(() => {
  let count = 0
  let countItems = (items: NestedNavigationItem[]) => {
    for (let item of items) {
      count++
      if (item.children) {
        countItems(item.children)
      }
    }
  }
  countItems(tocnav)
  return count
})

let active = $derived.by<TableOfContentsItem | null>(() => {
  if (!tableofcontents) return null

  const scrollMarginTop = getComputedStyle(
    document.documentElement,
  ).getPropertyValue('--scroll-margin-top')
  let scrollMarginTopValue: number
  // convert css value to pixel number
  if (scrollMarginTop.includes('rem')) {
    const remValue = parseFloat(scrollMarginTop.replace('rem', '').trim())
    const fontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    )
    scrollMarginTopValue = remValue * fontSize
  } else if (scrollMarginTop.includes('em')) {
    const emValue = parseFloat(scrollMarginTop.replace('em', '').trim())
    const fontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    )
    scrollMarginTopValue = emValue * fontSize
  } else {
    scrollMarginTopValue = parseFloat(scrollMarginTop.replace('px', '').trim())
  }

  let scrollY = scroll.y
  let closest: TableOfContentsItem | null = null
  let closestDistance = Infinity
  let first: TableOfContentsItem | null = null

  const checkItems = (items: TableOfContentsItem[]) => {
    if (items.length === 0) return

    for (let item of items) {
      if (item.level === 1) {
        checkItems(item.children)
        continue
      }

      if (!first) {
        first = item
      }

      let distance = Math.abs(
        item.position.top - scrollY - scrollMarginTopValue,
      )
      if (distance < closestDistance) {
        closestDistance = distance
        closest = item
      }
      if (item.children) {
        checkItems(item.children)
      }
    }
  }

  checkItems(tableofcontents.items)
  return closest || first
})

let activeItem = $derived.by<NestedNavigationItem | null>(() => {
  if (!active) return null
  return tableOfContentsItemToNavigationItem(active)
})
</script>

{#if tocnav && totalElements > 1}
  <div class="table-of-contents" use:fadein>
    <div class="title">
      <div class="icon">
        <ListTree />
      </div>
      <div class="text">On this page</div>
    </div>
    <div class="items">
      <NestedNavigation items={tocnav} {activeItem} />
    </div>
  </div>
{/if}

<style lang="scss">
.table-of-contents {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: var(--padding-xl);
  padding-left: calc(var(--padding-xxl));
  gap: var(--padding-m);
  position: fixed;
  z-index: 1998;
  top: 0;
  right: 0;
  width: 100%;

  @media screen and (min-width: 920px) {
    max-width: calc(var(--navigation-max-width) - var(--padding-xl));
  }

  @media screen and (max-width: 1319px) {
    display: none;
  }

  a,
  :global(a) {
    text-decoration: none;

    &:not(.active, :hover) {
      color: var(--color-text-normal);
    }
  }

  .title {
    display: flex;
    align-items: center;
    gap: var(--padding-s);
    font-size: var(--font-size-s);
  }

  .items {
    border-left: 2px solid var(--color-background-accent);
    padding-left: var(--padding-m);

    font-size: var(--font-size-s);
  }
}
</style>
