<script>
import { me } from '$lib/data/me'
import { age } from '$lib/utils/age'
import { currentJob } from '$lib/utils/currentjob'
import Link from './Link.svelte'
import Logo from './Logo.svelte'
</script>

<div class="root">
  <div class="logo extra-extra-large">
    <Logo />
  </div>

  <div class="about-me muted flex center column">
    <div class="background">
      {age} year old full stack developer from Copenhagen, Denmark<br />
    </div>

    {#if currentJob.company}
      <div class="position">
        Working as {currentJob.role?.title} @ {currentJob.company}
      </div>
    {/if}
  </div>

  <div class="contact-info dimmed flex center column">
    {#if me.email}
      <div class="contact flex gap-s">
        get in touch via <a href={`mailto:${me.email}`}>{me.email}</a>
      </div>
    {/if}

    {#if me.links && me.links.length}
      <div class="links flex gap-s">
        <div class="pre-link">find me @</div>
        {#each me.links as link, index}
          {#if me.links.length > 1 && index === me.links.length - 1}
            <div class="pre-link">or</div>
          {/if}
          <Link {...link} />
        {/each}
      </div>
    {/if}

    <div class="more-links flex gap-s">
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
  align-items: center;
  text-align: center;
  gap: var(--padding-m);
}
</style>
