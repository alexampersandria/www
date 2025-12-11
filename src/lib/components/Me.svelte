<script lang="ts">
import { me } from '$lib/data/me'

let { pronouns = false } = $props()
</script>

<div class="me">
  <div class="header">
    {#if me.photo}
      <div class="photo">
        <img
          class="me-photo fadein long-fadein"
          src={`/img/${me.photo}`}
          alt="Photo of {me.name}" />
      </div>
    {/if}
    <h2 class="nostyle name">{me.name}</h2>
  </div>

  {#if me.pronouns || me.email}
    <div class="details flex center gap-x-l">
      {#if me.pronouns && pronouns}
        <div class="pronouns">{me.pronouns.join('/')}</div>
      {/if}
      {#if me.email}
        <a class="email" href="mailto:{me.email}">{me.email}</a>
      {/if}
      {#if me.phone}
        <a class="phone" href="tel:{me.phone}">{me.phone}</a>
      {/if}
      {#each me.links as link}
        <a class="link" href={link.href} target={link.target}>{link.label}</a>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
.me {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--padding-xxs);

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--padding-m);
    text-align: center;

    .me-photo {
      --size: 8rem;
      border-radius: 50%;
      width: var(--size);
      height: var(--size);
      object-fit: cover;
    }

    .name {
      font-size: var(--font-size-l);
    }
  }
}
</style>
