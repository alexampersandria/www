<script lang="ts">
import { themeList, useThemeStore, type Theme } from '$lib/stores/theme.store.svelte'

const themeStore = useThemeStore()
const setTheme = (theme: Theme) => (themeStore.theme = theme)
</script>

<div class="theme-picker">
  <div class="themes">
    {#each themeList as theme}
      {@const active = themeStore.theme === theme}
      <button
        class="theme-button theme-{theme}"
        class:active
        onclick={() => setTheme(theme)}
        title={theme}
        aria-label={`Set theme to ${theme}`}>
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
    gap: var(--spacing-xs);

    .theme-button {
      position: relative;
      height: 1.25em;
      aspect-ratio: 1.675 / 1;
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

            box-shadow: 0 0 0 2px var(--color-text);
            z-index: 1;
          }
        }
      }
    }
  }
}
</style>
