<script lang="ts">
import { themeList, type Theme } from '$lib/stores/theme.store.svelte'

let {
  theme = $bindable(),
}: {
  theme?: Theme
} = $props()
</script>

<div class="theme-picker">
  <div class="themes">
    {#each themeList as themeItem}
      {@const active = themeItem === theme}
      <button
        class="theme-button theme-{themeItem}"
        class:active
        onclick={() => (theme = themeItem)}
        title={themeItem}
        aria-label={`Set theme to ${themeItem}`}>
      </button>
    {/each}
  </div>
</div>

<style lang="scss">
@import '$lib/assets/scss/color.scss';

.theme-picker {
  .themes {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-s);

    .theme-button {
      position: relative;
      height: 1.25em;
      width: 2rch;
      display: block;
      padding: 0;

      @each $theme in $themes {
        &.theme-#{$theme} {
          background-color: var(--theme-#{$theme}-background-secondary);
          color: var(--theme-#{$theme}-text);

          &:hover {
            background-color: var(--theme-#{$theme}-background);
            color: var(--theme-#{$theme}-text-muted);
          }

          &.active {
            background-color: var(--theme-#{$theme}-background);
            color: var(--theme-#{$theme}-background);

            box-shadow: 0 0 0 2px var(--color-foreground);
            z-index: 1;
          }
        }
      }
    }
  }
}
</style>
