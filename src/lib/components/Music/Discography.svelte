<script lang="ts">
import { discography } from '$lib/data/music'
import Release from './Release.svelte'
</script>

<div class="discography">
  {#each discography as release}
    <Release {release} />
  {/each}
</div>

<style lang="scss">
.discography {
  display: flex;
  flex-direction: column;
  gap: var(--padding-xl);
}
</style>
