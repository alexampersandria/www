<script>
import { me } from '$lib/data/me'
import { age } from '$lib/utils/age'
import { currentJob } from '$lib/utils/currentjob'
import { experience } from '$lib/utils/experience'
import Company from '../Company.svelte'
import Link from '../Link.svelte'
import Logo from '../Logo.svelte'
</script>

<div class="container min">
  <div class="app-page root-page gap-xl">
    <div class="header flex gap-l align-center">
      <div class="logo desktop-only">
        <Logo small />
      </div>
      <div class="info">
        <div class="name highlight">
          {me.name}
        </div>
        {#if currentJob}
          <div class="current-job">
            {currentJob.role.title} @ <Company {...currentJob.company} />
          </div>
        {/if}
      </div>
    </div>

    <div class="about">
      <div class="background">
        <span class="section-1">
          {age} year old full stack developer from Copenhagen, Denmark, with more
          than
          {experience} years of experience as both a developer and in a lead role.
        </span>
        <span class="section-2">
          I strive to create beautiful software that feels as good to use as it
          looks,
        </span>
        <span class="section-3">
          obsessing over the tiniest details that really make the difference.
        </span>
      </div>
    </div>

    <div class="contact">
      {#if me.email}
        <div class="email flex gapx-m space-between">
          <div class="pre-link">Get in touch via</div>

          <div class="links flex gapx-m">
            <Link href={`mailto:${me.email}`} label={me.email} />
          </div>
        </div>
      {/if}

      <div class="resume-links flex gapx-m space-between">
        <div class="pre-link">Or find me at</div>

        <div class="links flex gapx-m">
          {#each me.resumeLinks as link}
            <Link {...link} />
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.root-page {
  .header {
    .logo {
      background-color: var(--color-background-secondary);
      aspect-ratio: 1 / 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-s);
      padding: var(--padding-xs);

      :global(img) {
        transform: translateY(-1px);
      }
    }

    .name {
      @media screen and (max-width: 919px) {
        font-size: var(--font-size-l);
        font-weight: var(--font-weight-bold);
      }
    }
  }
}
</style>
