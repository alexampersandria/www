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

<div class="container about">
  <h2 id="what-is-diary-computer">What is diary.computer?</h2>

  <p>
    diary.computer is a mood tracker and micro-journaling app designed to help
    users reflect on their daily emotions and experiences. By requiring each
    entry to be assigned a "mood" value from 1-5, the app encourages reflection
    and introspection.
  </p>

  <p>
    By tagging entries with keywords, users can easily categorize and search
    their journal entries. The app also provides visualizations of mood trends
    over time, helping users identify patterns and triggers for their emotional
    states.
  </p>

  <p>
    I developed diary.computer as an extention of my own personal diary
    originally in Obsidian, but wanted a more structured and focused approach
    and simpified interface. As well as doing more in depth analysis of my mood
    over time, and analysis of what influences it.
  </p>
</div>

<div class="container max">
  <img
    src="/img/diary.computer.app.webp"
    alt="Screenshot of diary.computer app" />
</div>

<div class="container technical">
  <h2 id="technical-details">Technical Details</h2>

  <p>
    diary.computer is built using Rust for the backend, ensuring high
    performance and reliability. The frontend is developed with Svelte, which
    provides a smooth and responsive user experience. The app is designed to be
    lightweight and efficient, making it accessible on a variety of devices.
  </p>

  <p>
    I also chose rust and svelte to challenge myself and learn new technologies
    while building something I would want to use myself.
  </p>
</div>
