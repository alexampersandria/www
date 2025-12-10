<script lang="ts">
import { projects } from '$lib/data/projects'
</script>

<div class="projects">
  {#each projects as project}
    <div class="project">
      <div class="title">{project.title}</div>
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
  .project {
    display: flex;
    flex-direction: column;
    gap: var(--padding-xs);

    .title {
      font-size: var(--font-size-xl);
      font-weight: 600;
    }

    .links {
      display: flex;
      gap: var(--padding-m);
    }
  }
}
</style>
