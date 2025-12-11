<script lang="ts">
import { projects } from '$lib/data/projects'
</script>

<div class="projects">
  <h2 class="nostyle projects-title">Projects</h2>

  {#each projects as project}
    <div class="project">
      <div class="flex space-between">
        <div class="title">{project.title}</div>
        {#if project.period}
          <div class="period">
            <div class="from">{project.period.from}</div>
            <div class="to">{project.period.to}</div>
          </div>
        {/if}
      </div>

      <div class="description">{project.description}</div>
      <div class="links">
        <a class="view-project" href={`/projects/${project.id}`}>
          View Project
        </a>
        {#each project.links as link}
          <a
            class="external-link"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer">
            {link.label}
          </a>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
.projects {
  display: flex;
  flex-direction: column;
  gap: var(--padding-l);

  .projects-title {
    font-size: var(--font-size-xl);
    font-weight: 600;
  }

  .project {
    display: flex;
    flex-direction: column;
    gap: var(--padding-xxs);

    .title {
      font-size: var(--font-size-l);
      font-weight: 600;
    }

    .links {
      display: flex;
      gap: var(--padding-m);
    }
  }
}
</style>
