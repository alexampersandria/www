<script lang="ts">
import { active } from '$lib/shared/actions/active.svelte'

import type { Snippet } from 'svelte'

let {
  children,
  loading,
  disabled,
  fullwidth = false,
  onclick,
  href,
  target,
  'aria-label': ariaLabel,
  left,
  right,
}: {
  children: Snippet
  loading?: boolean
  disabled?: boolean
  fullwidth?: boolean
  onclick?: () => void
  href?: string
  target?: string
  'aria-label'?: string
  left?: boolean
  right?: boolean
} = $props()

let clickHandler = () => {
  if (!disabled && !loading && onclick && !href) {
    onclick()
  }
}
</script>

<svelte:element
  this={href ? 'a' : 'button'}
  class="button"
  class:loading
  class:disabled
  class:fullwidth
  class:left
  class:right
  use:active
  aria-busy={loading}
  {disabled}
  aria-label={ariaLabel}
  role={href ? 'link' : 'button'}
  onclick={clickHandler}
  {href}
  {target}>
  <div class="button-content">
    {@render children()}
  </div>
  {#if loading}
    <div class="button-loading">loading...</div>
  {/if}
</svelte:element>

<style lang="scss">
.button {
  --button-height: 43.28px;

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  height: var(--button-height);
  border: none;
  font-size: var(--font-size-m);
  line-height: 2; // ensure consistent line height depending on element type and no overflow from text
  overflow: hidden;
  white-space: nowrap;
  flex-shrink: 0;
  text-decoration: none;
  border-radius: var(--radius-s);

  .button-content {
    padding: var(--button-padding);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--button-content-gap);
    overflow: hidden;
  }

  &.fullwidth {
    width: 100%;
  }

  &.left {
    justify-content: flex-start;

    .button-content {
      justify-content: flex-start;
    }
  }

  &.right {
    justify-content: flex-end;

    .button-content {
      justify-content: flex-end;
    }
  }

  &.loading {
    cursor: wait;
  }

  &:not(:disabled, .loading) {
    cursor: pointer;

    &:active {
      background-color: var(--color-foreground-muted);
    }
  }

  background-color: var(--color-background-secondary);
  color: var(--color-foreground);

  &:disabled {
    cursor: not-allowed;
  }
}
</style>
