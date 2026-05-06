<script lang="ts">
import { afterNavigate } from '$app/navigation'
import { isActiveRoute } from '$lib/shared/actions/active.svelte'
import { fadein } from '$lib/shared/actions/fadein.svelte'
import { navigation } from '$lib/shared/data/navigation'
import Logo from '$lib/components/ui/Logo.svelte'
import ThemePicker from '$lib/views/ThemePicker.svelte'
import NestedNavigation from '$lib/components/navigation/NestedNavigation.svelte'
import { useThemeStore } from '$lib/stores/theme.store.svelte'

const themeStore = useThemeStore()

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
          {#if open}
            close
          {:else}
            menu
          {/if}
        </button>
      </div>
    </div>
  </div>

  <div class="navigation-content" class:open>
    <div class="links">
      {#each navigation as link}
        {#key link.href}
          {@const active = isActiveRoute(link.href)}
          <div class="link-wrapper">
            <a href={link.href} class="nav-link" class:active>
              {link.label}
            </a>
            {#if link.children && link.children.length > 0}
              <div class="nav-link-sub children" use:fadein>
                <NestedNavigation items={link.children} />
              </div>
            {/if}
          </div>
        {/key}
      {/each}
    </div>

    <div class="footer">
      <div class="theme">
        <ThemePicker bind:theme={themeStore.theme} />
      </div>

      <div class="copy">
        &copy; {new Date().getFullYear()}
        Liara Alexandria Brüchmann
      </div>
    </div>
  </div>
</div>

<style lang="scss">
.navigation {
  --transition-delay: 0ms;
  --transition-duration: var(--animation-length-m);

  transition:
    background-color var(--transition-duration) var(--better-ease-out),
    backdrop-filter var(--transition-duration) var(--better-ease-out);
  transition-delay: var(--transition-delay);

  .navigation-content {
    transition:
      opacity var(--transition-duration) var(--better-ease-out),
      transform var(--transition-duration) var(--better-ease-out),
      filter var(--transition-duration) var(--better-ease-out);
    transition-delay: var(--transition-delay);
  }

  display: flex;
  flex-direction: column;
  height: 100%;
  padding: var(--spacing-xl);
  gap: var(--spacing-m);
  position: fixed;
  z-index: 1998;
  top: 0;
  left: 0;
  width: 100%;

  .footer {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-s);
    flex-shrink: 0;

    .copy {
      font-size: var(--font-size-s);
      color: var(--color-foreground-muted);
    }
  }

  a,
  :global(a),
  .copy {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    pointer-events: initial;
  }

  .link-wrapper {
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 0;

    &:not(:has(.active)) {
      .children {
        display: none;
      }
    }
  }

  a,
  :global(a) {
    text-decoration: none;

    &:not(.active, :hover) {
      color: var(--color-foreground);
    }
  }

  @media screen and (min-width: 920px) {
    max-width: calc(var(--navigation-max-width) - var(--spacing-xl));
    min-width: var(--navigation-min-width);
    padding-inline: 0;
    padding-right: var(--spacing-m);
    left: var(--spacing-xl);
    pointer-events: none;

    .menu,
    .links,
    .footer {
      pointer-events: initial;
    }

    .menu {
      .toggle-content {
        display: none;
      }
    }
  }

  @media screen and (max-width: 919px) {
    &:not(:has(.open)) {
      // wait for root out:fade duration
      --transition-delay: 100ms;
    }

    width: 100%;

    .menu,
    .navigation-content.open,
    .theme {
      pointer-events: initial;
    }

    pointer-events: none;
    background-color: var(--color-background);

    &:not(:has(.navigation-content.open)) {
      background-color: transparent;
    }

    .navigation-content {
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;

      font-size: var(--font-size-l);
      padding-top: var(--spacing-m);

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
    flex: 1 1 auto;
    gap: var(--spacing-m);

    .links {
      flex-shrink: 1;
      display: flex;
      flex-direction: column;
      padding-bottom: var(--spacing-xl);

      :global(a) {
        white-space: nowrap;
      }

      .nav-link {
        flex-shrink: 0;
      }

      .nav-link-sub {
        :global(.nested-navigation) {
          padding-left: 2ch;
        }
      }
    }
  }
}
</style>
