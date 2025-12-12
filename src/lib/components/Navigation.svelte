<script lang="ts">
import { afterNavigate } from '$app/navigation'
import { isActiveRoute } from '$lib/actions/active.svelte'
import { fadein } from '$lib/actions/fadein.svelte'
import { navigation } from '$lib/data/navigation'
import type { NestedNavigationItem } from '$lib/types/navigation'
import {
  type TableOfContentsItem,
  type TableOfContents as TableOfContentsType,
} from '$lib/utils/toc'
import Logo from './Logo.svelte'
import TableOfContents from './NestedNavigation.svelte'

let { tableofcontents }: { tableofcontents?: TableOfContentsType } = $props()

const tableOfContentsItemToNavigationItem = (
  item: TableOfContentsItem,
): NestedNavigationItem => {
  return {
    label: item.title,
    href: `#${item.id}`,
    level: item.level,
    children: item.children.map(child =>
      tableOfContentsItemToNavigationItem(child),
    ),
  }
}

let tocnav: NestedNavigationItem[] = $derived.by(() => {
  return (
    tableofcontents?.items.map(item => {
      return tableOfContentsItemToNavigationItem(item)
    }) ?? []
  )
})

let open = $state(false)
let toggleMenu = () => {
  open = !open
}

afterNavigate(() => {
  open = false
})
</script>

<div class="navigation" use:fadein>
  <div class="menu">
    <div class="flex space-between">
      <a href="/">
        <Logo />
      </a>

      <div class="toggle-content">
        <button onclick={toggleMenu} class="plain" aria-label="Toggle menu">
          menu
        </button>
      </div>
    </div>
  </div>

  <div class="navigation-content" class:open>
    <div class="links">
      {#each navigation as link}
        {#key link.href}
          {@const active = isActiveRoute(link.href)}
          <a href={link.href} class="nav-link" class:active>
            {link.label}
          </a>
          {#if active}
            {#if link.children && link.children.length > 0}
              <div class="nav-link-sub children" use:fadein>
                <TableOfContents items={link.children} />
              </div>
            {:else if link.showTableOfContents && tocnav && tocnav.length > 0}
              {#key tocnav}
                <div class="nav-link-sub toc" use:fadein>
                  <TableOfContents items={tocnav} />
                </div>
              {/key}
            {/if}
          {/if}
        {/key}
      {/each}
    </div>

    <div class="copy">
      &copy; {new Date().getFullYear()} Liara Alexandria Brüchmann
    </div>
  </div>
</div>

<style lang="scss">
.navigation {
  --transition-duration: var(--animation-length-m);

  transition:
    background-color var(--transition-duration) var(--better-ease-out),
    backdrop-filter var(--transition-duration) var(--better-ease-out);

  .navigation-content {
    transition:
      opacity var(--transition-duration) var(--better-ease-out),
      transform var(--transition-duration) var(--better-ease-out),
      filter var(--transition-duration) var(--better-ease-out);
  }

  display: flex;
  flex-direction: column;
  height: 100%;
  padding: var(--padding-l);
  gap: var(--padding-m);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  .copy {
    flex-shrink: 0;
    color: var(--text-accent);
    font-size: var(--font-size-xs);
  }

  a,
  :global(a),
  .copy {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    pointer-events: initial;
  }

  @media screen and (min-width: 920px) {
    max-width: calc((50vw - var(--container-width) / 2) - var(--padding-l));
    min-width: var(--navigation-min-width);
    padding-inline: 0;
    padding-right: var(--padding-m);
    left: var(--padding-l);
    pointer-events: none;

    .menu,
    .links {
      pointer-events: initial;
    }

    .menu {
      .toggle-content {
        display: none;
      }
    }
  }

  @media screen and (max-width: 919px) {
    width: 100%;

    .menu,
    .navigation-content.open {
      pointer-events: initial;
    }

    pointer-events: none;

    &:after {
      content: '';
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: linear-gradient(
        to bottom,
        rgba(20, 20, 20, 0.75),
        rgba(0, 0, 0, 0.92)
      );
      backdrop-filter: blur(16px) grayscale(0.8);
      transition:
        opacity var(--transition-duration) var(--better-ease-out),
        backdrop-filter var(--transition-duration) var(--better-ease-out);
      z-index: -1;
    }

    &:not(:has(.navigation-content.open)) {
      &:after {
        opacity: 0;
        backdrop-filter: blur(0px) grayscale(0);
      }
    }

    .navigation-content {
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;

      font-size: var(--font-size-l);
      padding-top: var(--padding-m);

      :global(.table-of-contents) {
        font-size: var(--font-size-l);
      }

      &:not(.open) {
        opacity: 0;
        transform: translateY(1rem);
        filter: blur(4px);

        &,
        a,
        :global(a),
        .copy {
          pointer-events: none;
        }
      }

      &.open {
        transform: translateY(0);
        opacity: 1;
        filter: blur(0);
      }
    }
  }

  .navigation-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    flex: 1 1 auto;
    gap: var(--padding-m);

    .links {
      flex-shrink: 1;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      padding-bottom: var(--padding-l);

      :global(a) {
        white-space: nowrap;
      }

      .nav-link {
        flex-shrink: 0;
      }

      .nav-link-sub {
        :global(.table-of-contents) {
          padding-left: var(--padding-m);
        }
      }
    }
  }
}
</style>
