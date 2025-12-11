<script>
import { me } from '$lib/data/me'
import { resume } from '$lib/data/resume'
</script>

<div class="container">
  <div class="header flex column gap-m">
    <h1>{me.name}</h1>

    <div class="background muted">{resume.background}</div>

    {#if me.email}
      <div class="contact muted flex gap-s">
        Get in touch <a href={`mailto:${me.email}`}>{me.email}</a>
      </div>
    {/if}

    {#if me.links && me.links.length}
      <div class="links muted flex gap-s">
        <div class="pre-link">Or find me @</div>
        {#each me.links as link}
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        {/each}
      </div>
    {/if}
  </div>
</div>
