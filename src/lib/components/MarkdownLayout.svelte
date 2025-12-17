<script lang="ts">
import type { Snippet } from 'svelte'

let { children }: { children?: Snippet } = $props()
</script>

<div class="markdown-layout">
  <div class="app-page">
    <div class="container">
      {#if children}
        {@render children()}
      {:else}
        <div class="no-content">
          <h1>No Content</h1>
        </div>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
.markdown-layout {
  :global(b),
  :global(strong) {
    color: var(--color-text-highlight);
  }
}
</style>
