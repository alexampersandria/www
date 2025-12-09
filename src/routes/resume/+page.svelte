<script lang="ts">
import Me from '$lib/components/Me.svelte'
import Resume from '$lib/components/Resume.svelte'
</script>

<div class="app-page resume-page">
  <div class="resume-head">
    <Me />
  </div>

  <Resume />
</div>

<style lang="scss">
.resume-page {
  display: flex;
  flex-direction: column;
  gap: var(--padding-l);
}
</style>
