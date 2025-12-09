<script lang="ts">
import { page } from '$app/state'
</script>

<div class="error">
  <div class="status">
    {page.status}
  </div>
  <div class="message">
    {#if page.error}
      {page.error.message}
    {:else}
      An unexpected error has occurred
    {/if}
  </div>
</div>

<style lang="scss">
.error {
  display: flex;
  flex-direction: column;
  gap: var(--padding-m);
  justify-content: center;
  height: 100%;
}
</style>
