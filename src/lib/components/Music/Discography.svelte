<script lang="ts">
import { discography } from '$lib/data/music'
import Release from './Release.svelte'

let {
  tracklist = true,
}: {
  tracklist?: boolean
} = $props()
</script>

<div class="discography">
  {#each discography as release}
    <Release {release} {tracklist} />
  {/each}
</div>

<style lang="scss">
.discography {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-l);
}
</style>
