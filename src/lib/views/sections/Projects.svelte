<script lang="ts">
import { projects } from '$lib/data/projects'
import Link from '$lib/components/ui/Link.svelte'
import TimePeriod from '$lib/components/ui/TimePeriod.svelte'

let {
  limit,
}: {
  limit?: number
} = $props()

const shownProjects = $derived.by(() => {
  if (limit === undefined) return projects
  else return projects.slice(0, limit)
})

const hasMore = $derived.by(() => {
  return limit !== undefined && projects.length > limit
})
</script>

<div class="projects">
  <div class="title flex">
    <h2 id="projects" class="nostyle highlight">Projects</h2>
  </div>
  {#each shownProjects as project}
    <div class="project">
      <div class="project-info">
        <h3 id={project.id} class="nostyle title">{project.title}</h3>
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
  {#if hasMore}<a href="/projects">→ All projects</a>{/if}
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
      }
    }

    .links {
      display: flex;
      gap: var(--spacing-m);
    }
  }
}
</style>
