<script lang="ts">
import Me from '$lib/components/Me.svelte'
import Resume from '$lib/components/Resume.svelte'
</script>

<div class="app-page">
  <div class="container resume">
    <div class="resume-head">
      <Me />
    </div>

    <Resume />
  </div>
</div>

<style lang="scss">
.resume {
  display: flex;
  flex-direction: column;
  gap: var(--padding-xl);
}
</style>
