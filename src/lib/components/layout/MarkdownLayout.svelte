<script lang="ts">
import type { Snippet } from 'svelte'
import IssueLink from '$lib/components/ui/IssueLink.svelte'

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
            <h1 id="no-content">No Content</h1>
            <div class="message">
              This page contains no content <br />
              If you believe this to be an error <IssueLink />
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
.markdown-layout {
  .no-content {
    .text {
      h1 {
        display: flex;
        align-items: center;
        gap: var(--spacing-s);
      }
    }
  }
}
</style>
