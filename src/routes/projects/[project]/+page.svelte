<script lang="ts">
import { watch } from 'runed'
import type { PageProps } from './$types'
import { fadein } from '$lib/actions/fadein.svelte'
import NewIssue from '$lib/components/NewIssue.svelte'

let { data }: PageProps = $props()

let ProjectView = $state<
  typeof import('svelte').SvelteComponent | null | undefined
>(undefined)
const loadProject = async (id: string) => {
  try {
    const module = await import(`$lib/projects/${id}.svelte`)
    ProjectView = module.default
  } catch (e) {
    console.warn(`project "${id}" not found`, e)
    ProjectView = null
  }
}

watch(
  () => data.id,
  () => {
    if (data.id) {
      loadProject(data.id)
    }
  },
)

let status: 'loading' | 'not-found' | 'loaded' = $derived.by(() => {
  if (ProjectView === undefined) return 'loading'
  if (ProjectView === null) return 'not-found'
  return 'loaded'
})
</script>

<div class="app-page">
  <div class="container mobile-only">
    <a href="/projects" class="back"> ← Projects </a>
  </div>

  {#key `${data.id}-${status}`}
    <div class="project" use:fadein>
      {#if status === 'loaded'}
        {#key data.id}
          <ProjectView />
        {/key}
      {:else if status === 'not-found'}
        <div class="container">
          <div class="large">Error</div>
          <div class="small muted">
            View for project <code>{data.id}</code> not found
            <br />
            If you believe this to be an error <NewIssue /> on GitHub
          </div>
        </div>
      {/if}
    </div>
  {/key}
</div>
