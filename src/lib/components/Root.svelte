<script>
import { me } from '$lib/data/me'
import { age } from '$lib/utils/age'
import { currentJob } from '$lib/utils/currentjob'
import Link from './Link.svelte'
import Logo from './Logo.svelte'
</script>

<div class="root">
  <div class="logo extra-extra-large flex center">
    <Logo />
  </div>

  <div class="about-me muted">
    <div class="background">
      {age} year old full stack developer from Copenhagen, Denmark<br />
    </div>

    {#if currentJob.company}
      <div class="position">
        Working as {currentJob.role?.title} @ {currentJob.company}
      </div>
    {/if}
  </div>

  <div class="contact-info dimmed">
    {#if me.email}
      <div class="contact flex gapx-s">
        get in touch via <a href={`mailto:${me.email}`}>{me.email}</a>
      </div>
    {/if}

    {#if me.links && me.links.length}
      <div class="links flex gapx-s">
        <div class="pre-link">find me @</div>
        {#each me.links as link, index}
          {#if me.links.length > 1 && index === me.links.length - 1}
            <div class="pre-link">or</div>
          {/if}
          <Link {...link} />
        {/each}
      </div>
    {/if}

    <div class="more-links flex gapx-s">
      <div class="pre-link">...or checkout my</div>
      <a href="/projects">Projects</a>
      <a href="/resume">Resume</a>
      <div class="pre-link">or</div>
      <a href="/music">Music</a>
    </div>
  </div>
</div>

<style lang="scss">
.root {
  display: flex;
  flex-direction: column;
  gap: var(--padding-m);
  padding-bottom: var(--padding-l);
}
</style>
