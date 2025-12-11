<script lang="ts">
import { page } from '$app/state'
</script>

<div class="container">
  <div class="app-page">
    <div class="status large">
      {page.status}
    </div>
    <div class="message small muted">
      {#if page.error}
        {page.error.message}
      {:else}
        An unexpected error has occurred
      {/if}
    </div>
  </div>
</div>
