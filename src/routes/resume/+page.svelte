<script lang="ts">
import Header from '$lib/views/sections/Header.svelte'
import Resume from '$lib/views/sections/Resume.svelte'
</script>

<div class="app-page">
  <div class="container resume">
    <div class="resume-head">
      <Header />
    </div>

    <Resume />
  </div>
</div>

<style lang="scss">
.resume {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);

  .resume-head {
    padding-block-end: var(--spacing-s);
  }
}
</style>
