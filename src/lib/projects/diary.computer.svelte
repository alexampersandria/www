<script lang="ts">
import { projects } from '$lib/data/projects'

let project = projects.find(project => project.id === 'diary.computer')
</script>

<div class="container centered pb-l">
  <h2 class="mb-xxs">diary.computer</h2>

  <div class="subtitle">
    mood tracker & micro-journaling — written in Rust & Svelte
  </div>

  <div class="links flex center gap-s">
    {#each project?.links as link}
      <a href={link.href} target={link.target}>{link.label}</a>
    {/each}
  </div>
</div>

<div class="container max py-l">
  <img
    src="/img/diary.computer.landing.webp"
    alt="Screenshot of diary.computer landing page" />
</div>

<div class="container">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua.
  </p>

  <p>
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat.
  </p>

  <p>
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
    eu fugiat nulla pariatur.
  </p>
</div>

<div class="container max">
  <img
    src="/img/diary.computer.app.webp"
    alt="Screenshot of diary.computer app" />
</div>
