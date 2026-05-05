<script lang="ts">
import { resume } from '$lib/data/resume'
import { currentPosition } from '$lib/utils/currentjob'
import Institution from './resume/Institution.svelte'
import Position from './resume/Position.svelte'

let {
  background = true,
  positions = true,
  education = true,
}: {
  background?: boolean
  positions?: boolean
  education?: boolean
} = $props()
</script>

<div class="resume">
  {#if resume.background && background}
    <div class="section background">
      <div class="section-title">
        <h2 id="background" class="nostyle highlight">Background</h2>
      </div>
      <div class="section-content">
        {resume.background}
      </div>
    </div>
  {/if}

  {#if currentPosition && positions}
    <div class="section positions">
      <div class="section-title">
        <h2 id="current" class="nostyle highlight">Currently working @</h2>
      </div>
      <div class="section-content">
        <Position position={currentPosition} />
      </div>
    </div>
  {/if}

  {#if resume.positions.length > 0 && positions}
    <div class="section positions">
      <div class="section-title">
        <h2 id="previous" class="nostyle highlight">Previous</h2>
      </div>
      <div class="section-content">
        {#each resume.positions as position}
          {@const isCurrent =
            position.company.name === currentPosition?.company.name &&
            position.roles[0].title === currentPosition?.roles[0].title}
          {#if !isCurrent}
            <Position {position} />
          {/if}
        {/each}
      </div>
    </div>
  {/if}

  {#if resume.education.length > 0 && education}
    <div class="section education">
      <div class="section-title">
        <div id="education" class="highlight">Education</div>
      </div>
      <div class="section-content">
        {#each resume.education as institution}
          <Institution {institution} />
        {/each}
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
.resume {
  display: contents;

  .section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-l);

    .section-title {
      display: flex;
    }

    .section-content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-m);
    }
  }

  .background {
    hyphens: auto;
  }
}
</style>
