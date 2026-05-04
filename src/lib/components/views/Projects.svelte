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
      <div class="flex space-between">
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
  gap: var(--padding-m);

  .project {
    display: flex;
    flex-direction: column;
    gap: var(--padding-xxs);

    .title {
      font-weight: var(--font-weight-bold);
      color: var(--color-text-strong);
    }

    .links {
      display: flex;
      gap: var(--padding-m);
    }
  }
}
</style>
