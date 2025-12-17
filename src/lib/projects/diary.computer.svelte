<script lang="ts">
import Link from '$lib/components/Link.svelte'
import { projects } from '$lib/data/projects'

let project = projects.find(project => project.id === 'diary.computer')
</script>

<div class="container centered pb-l">
  <h1 class="mb-xxs">diary.computer</h1>

  <div class="subtitle">
    mood tracker & micro-journaling — written in Rust & Svelte
  </div>

  <div class="links flex center gap-s">
    {#each project?.links as link}
      <Link {...link} />
    {/each}
  </div>
</div>

<div class="container max py-l">
  <img
    src="/img/diary.computer.landing.webp"
    alt="Screenshot of diary.computer landing page" />
</div>

<div class="container max">
  <img
    src="/img/diary.computer.app.webp"
    alt="Screenshot of diary.computer app" />
</div>
