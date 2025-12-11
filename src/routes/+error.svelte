<script lang="ts">
import { page } from '$app/state'
import { fadein } from '$lib/actions/fadein.svelte'
import { onMount } from 'svelte'

let show = $state<boolean>(false)

onMount(() => {
  setTimeout(() => {
    show = true
  }, 250)
})
</script>

<div class="app-page error-page">
  <div class="container">
    {#if show}
      <div class="error" use:fadein>
        <div class="status large">
          Error {page.status}
        </div>
        <div class="message small muted">
          {#if page.error}
            {page.error.message}
          {:else}
            An unexpected error has occurred
          {/if}
        </div>
      </div>
    {/if}
  </div>
</div>
