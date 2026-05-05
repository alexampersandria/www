<script lang="ts">
import { projects } from '$lib/data/projects'
import Link from '../Link.svelte'
import TimePeriod from '../TimePeriod.svelte'
</script>

<div class="projects">
  <div class="title flex">
    <div class="highlight">Projects</div>
  </div>
  {#each projects as project}
    <div class="project">
      <div class="project-info">
        <div class="title">{project.title}</div>
        {#if project.period}
          <TimePeriod from={project.period.from} to={project.period.to} />
        {/if}
      </div>

      <div class="description">{project.description}</div>
      <div class="links">
        {#each project.links as link}
          <Link {...link} />
        {/each}
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
.projects {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-l);

  .project {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xxs);

    .project-info {
      display: flex;
      justify-content: space-between;
      column-gap: var(--spacing-m);
      flex-wrap: wrap;

      @media (max-width: 768px) {
        flex-direction: column;
      }

      .title {
        font-weight: var(--font-weight-bold);
        color: var(--color-text);
      }
    }

    .links {
      display: flex;
      gap: var(--spacing-m);
    }
  }
}
</style>
