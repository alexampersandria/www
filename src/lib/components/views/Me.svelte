<script>
import { me } from '$lib/data/me'
</script>

<div class="header flex gap-l align-center">
  <div class="info">
    <div class="name">
      {me.name}
    </div>
    {#if me.tagline}
      <div class="tagline">
        {me.tagline}
      </div>
    {/if}
    {#if me.birthday}
      <div class="birthday">
        b. {me.birthday}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
.info {
  display: flex;
  flex-direction: column;

  .name {
    font-weight: var(--font-weight-bold);
  }
}
</style>
