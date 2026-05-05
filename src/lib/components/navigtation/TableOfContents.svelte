<script lang="ts">
import type { NestedNavigationItem } from '$lib/data/navigation'
import {
  tableOfContentsItemToNavigationItem,
  type TableOfContents,
  type TableOfContentsItem,
} from '$lib/utils/toc'
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

let flatItems = $derived.by(() => {
  let items: TableOfContentsItem[] = []
  const flatten = (tocItems: TableOfContentsItem[]) => {
    for (let item of tocItems) {
      items.push(item)
      if (item.children) {
        flatten(item.children)
      }
    }
  }
  if (tableofcontents) {
    flatten(tableofcontents.items)
  }
  // remove level 1 items
  items = items.filter(item => item.level > 1)
  return items
})

let totalElements = $derived.by(() => {
  return flatItems.length
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

  let closest: TableOfContentsItem | null = null
  let closestDistance = Infinity
  let first: TableOfContentsItem | null = null
  let last: TableOfContentsItem | null = null

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
        item.position.top - scroll.y - scrollMarginTopValue,
      )
      if (distance < closestDistance) {
        closestDistance = distance
        closest = item
      }
      if (item.children) {
        checkItems(item.children)
      }

      last = item
    }
  }

  checkItems(tableofcontents.items)

  const scrolledToBottom = scroll.arrived.bottom && scroll.y > 0
  if (scrolledToBottom && last) return last

  return closest || first
})

let activeItem = $derived.by<NestedNavigationItem | null>(() => {
  if (!active) return null
  return tableOfContentsItemToNavigationItem(active)
})

let activeIndex = $derived.by(() => {
  if (!activeItem) return -1
  return flatItems.findIndex(item => item.id === active!.id)
})

// return percentage position of active index
let cursorPosition = $derived.by(() => {
  if (activeIndex === -1) return '0%'
  return `${(activeIndex / totalElements) * 100}%`
})
</script>

{#if tocnav && totalElements > 1}
  <div class="table-of-contents" use:fadein>
    <div class="title">
      <div class="icon">↳</div>
      <div class="text">On this page</div>
    </div>
    <div class="items">
      <div class="cursor" style="top: {cursorPosition}"></div>
      <NestedNavigation items={tocnav} {activeItem} />
    </div>
  </div>
{/if}

<style lang="scss">
.table-of-contents {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: var(--spacing-xxl) var(--spacing-xl);
  padding-left: calc(var(--spacing-xxl));
  gap: var(--spacing-s);
  position: fixed;
  z-index: 1998;
  top: 0;
  right: 0;
  width: 100%;

  font-size: var(--font-size-s);

  @media screen and (min-width: 920px) {
    max-width: calc(var(--navigation-max-width) - var(--spacing-xl));
  }

  @media screen and (max-width: 1319px) {
    display: none;
  }

  :global(a) {
    text-decoration: none;

    &:not(.active, :hover) {
      color: var(--color-text);
    }
  }

  .title {
    display: flex;
    align-items: center;
    gap: var(--spacing-s);

    .icon {
      min-width: calc(2ch - 2px);
    }
  }

  .items {
    border-left: 2px solid var(--color-background-secondary);
    padding-left: var(--spacing-m);
    position: relative;

    .cursor {
      --cursor-height: 1.477rem;
      --cursor-width: 2px;
      position: absolute;
      left: calc(-1 * var(--cursor-width));
      width: var(--cursor-width);
      height: var(--cursor-height);
      background-color: var(--color-text);
      border-radius: calc(1px * infinity);
      transition: top var(--animation-length-s) var(--better-ease-out);
    }
  }
}
</style>
