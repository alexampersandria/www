<script lang="ts">
import PhotoHeader from '$lib/views/PhotoHeader.svelte'
import Resume from '$lib/views/Resume.svelte'
</script>

<div class="app-page">
  <div class="container resume">
    <div class="resume-head">
      <PhotoHeader />
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
