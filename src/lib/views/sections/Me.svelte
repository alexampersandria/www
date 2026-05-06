<script lang="ts">
import { me } from '$lib/shared/data/me'
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
    <div class="details">
      {#if me.birthday}
        <div class="birthday">
          b. {me.birthday}
        </div>
      {/if}
      {#if me.pronouns}
        <div class="pronouns">
          {me.pronouns.join('/')}
        </div>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
.info {
  display: flex;
  flex-direction: column;

  .name {
    font-weight: var(--font-weight-bold);
  }

  .details {
    display: flex;
    gap: var(--spacing-m);
  }
}
</style>
