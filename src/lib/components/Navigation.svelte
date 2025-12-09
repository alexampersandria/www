<script lang="ts">
import { afterNavigate } from '$app/navigation'
import { isActiveRoute } from '$lib/actions/active.svelte'
import { fadein } from '$lib/actions/fadein.svelte'
import type { Link } from '$lib/types/link'
import {
  generateTableOfContents,
  type TableOfContents as TableOfContentsType,
} from '$lib/utils/toc'
import Logo from './Logo.svelte'
import TableOfContents from './TableOfContents.svelte'

let { main }: { main?: HTMLElement } = $props()

let toc: TableOfContentsType | null = $state(null)
afterNavigate(() => {
  let timeout = 0
  if (open) timeout = 500

  open = false

  setTimeout(() => {
    toc = null
    if (main) {
      toc = generateTableOfContents(main)
    } else {
      toc = null
    }
  }, timeout)
})

let links: Link[] = [
  { label: 'Root', href: '/' },
  { label: 'Resume', href: '/resume' },
  { label: 'Photography', href: '/photography' },
  { label: 'Music', href: '/music' },
]

let open = $state(false)
let toggleMenu = () => {
  open = !open
  if (open && toc === null && main) {
    toc = generateTableOfContents(main)
  }
}
</script>

<div class="navigation">
  <div class="menu">
    <div class="flex-between">
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
      {#each links as link}
        {#key link.href}
          {@const active = isActiveRoute(link.href)}
          <a href={link.href} class="nav-link" class:active>
            {link.label}
          </a>
          {#if active && toc && toc.items.length > 0}
            <div class="nav-link-toc" use:fadein>
              <TableOfContents items={toc.items} />
            </div>
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

  @media screen and (min-width: 920px) {
    max-width: calc(50vw - var(--content-max-width) / 2);
    min-width: var(--navigation-min-width);

    .menu {
      .toggle-content {
        display: none;
      }
    }
  }

  @media screen and (max-width: 919px) {
    pointer-events: none;
    width: 100%;

    .menu,
    .navigation-content {
      pointer-events: all;
    }

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

      &:not(.open) {
        opacity: 0;
        pointer-events: none;
        transform: translateY(1rem);
        filter: blur(4px);
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
    height: 100%;
    overflow-y: auto;

    .links {
      display: flex;
      flex-direction: column;

      :global(a) {
        white-space: nowrap;
      }

      .nav-link-toc {
        :global(.table-of-contents) {
          padding-left: var(--padding-m);
        }
      }
    }

    .copy {
      color: var(--text-accent);
      font-size: var(--font-size-xs);
      margin-top: var(--padding-l);
    }

    a,
    .copy {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
