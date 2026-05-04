<script lang="ts">
import { me } from '$lib/data/me'
import Link from './Link.svelte'

let { pronouns = false, 'all-links': allLinks = false } = $props()
</script>

<div class="me">
  {#if me.photo}
    <div class="photo">
      <img class="me-photo" src={`/img/${me.photo}`} alt="Photo of {me.name}" />
    </div>
  {/if}

  <div class="right">
    <div class="header">
      <h2 class="nostyle name">{me.name}</h2>
      {#if me.birthday}
        <div class="birthday">b. {me.birthday}</div>
      {/if}
    </div>

    {#if me.pronouns || me.email}
      {@const shownLinks = allLinks ? me.links : me.resumeLinks}
      <div class="details">
        {#if me.pronouns && pronouns}
          <div class="pronouns">{me.pronouns.join('/')}</div>
        {/if}
        {#if me.email}
          <a class="email" href="mailto:{me.email}">{me.email}</a>
        {/if}
        {#if me.phone}
          <a class="phone" href="tel:{me.phone}">{me.phone}</a>
        {/if}

        {#each shownLinks as link}
          <Link {...link} />
        {/each}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
.me {
  display: flex;
  gap: var(--padding-l);
  justify-content: flex-start;
  align-items: stretch;

  .photo {
    --size: 6rem;
    border-radius: var(--radius-s);
    width: var(--size);
    height: var(--size);
    object-fit: cover;
    box-shadow:
      0 0 0 2px var(--color-background-primary),
      0 0 0 4px var(--color-text);
    overflow: hidden;
  }

  .right {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
  }

  .details {
    display: flex;
    gap: var(--padding-m);
  }

  .header {
    h2 {
      margin: 0;
    }
  }
}
</style>
