<script lang="ts">
import { BookDashed } from 'lucide-svelte'
import type { Snippet } from 'svelte'
import NewIssue from '../NewIssue.svelte'

let { children }: { children?: Snippet } = $props()
</script>

<div class="markdown-layout">
  <div class="app-page">
    <div class="container">
      {#if children}
        {@render children()}
      {:else}
        <div class="no-content">
          <div class="text">
            <h1 id="no-content">
              <BookDashed />
              No Content
            </h1>
            <div class="message">
              This page contains no content <br />
              If you believe this to be an error <NewIssue />
            </div>
          </div>
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

  .no-content {
    .text {
      h1 {
        display: flex;
        align-items: center;
        gap: var(--padding-s);
      }
    }
  }
}
</style>
