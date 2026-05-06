<script lang="ts">
import { me } from '$lib/data/me'
import Link from '$lib/components/ui/Link.svelte'

let { 'all-links': allLinks = false } = $props()

const shownLinks = $derived(allLinks ? me.links : me.resumeLinks)
</script>

<div class="me">
  {#if me.photo}
    <div class="photo">
      <img class="me-photo" src={`/img/${me.photo}`} alt="Photo of {me.name}" />
    </div>
  {/if}

  <div class="right">
    <div class="header">
      <div class="name">{me.name}</div>
      <div class="line-two">
        {#if me.birthday}
          <div class="birthday">b. {me.birthday}</div>
        {/if}
        {#if me.pronouns}
          <div class="pronouns">{me.pronouns.join('/')}</div>
        {/if}
      </div>
    </div>

    <div class="details">
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
  </div>
</div>

<style lang="scss">
.me {
  display: flex;
  gap: var(--spacing-l);
  justify-content: flex-start;
  align-items: stretch;

  .photo {
    --size: 6rem;
    border-radius: var(--radius-s);
    width: var(--size);
    height: var(--size);
    object-fit: cover;
    box-shadow:
      0 0 0 2px var(--color-background),
      0 0 0 4px var(--color-foreground);
    overflow: hidden;
  }

  .right {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
  }

  .details,
  .line-two {
    display: flex;
    column-gap: var(--spacing-m);
    flex-wrap: wrap;
  }

  .name {
    font-weight: var(--font-weight-bold);
  }
}
</style>
