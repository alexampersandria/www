<script lang="ts">
import { projects } from '$lib/data/projects'
import Link from './Link.svelte'
import TimePeriod from './TimePeriod.svelte'
</script>

<div class="projects">
  {#each projects as project}
    <div class="project">
      <div class="flex space-between">
        <div class="title">{project.title}</div>
        {#if project.period}
          <TimePeriod from={project.period.from} to={project.period.to} />
        {/if}
      </div>

      <div class="description">{project.description}</div>
      <div class="links">
        <a class="view-project" href={`/projects/${project.id}`}>
          View Project
        </a>
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
  gap: var(--padding-xl);

  .project {
    display: flex;
    flex-direction: column;
    gap: var(--padding-xxs);

    .title {
      font-size: var(--font-size-l);
      font-weight: var(--font-weight-bold);
      color: var(--color-text-highlight);
    }

    .links {
      display: flex;
      gap: var(--padding-m);
    }
  }
}
</style>
