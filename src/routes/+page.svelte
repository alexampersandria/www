<script>
import Contact from '$lib/components/views/Contact.svelte'
import Projects from '$lib/components/views/Projects.svelte'
import Resume from '$lib/components/views/Resume.svelte'
import Me from '$lib/components/views/Me.svelte'
import DiscographyList from '$lib/components/music/DiscographyList.svelte'
</script>

<div class="app-page">
  <div class="container">
    <div class="home">
      <Me />
      <Resume background={false} education={false} />
      <Projects />
      <DiscographyList />
      <Contact />
    </div>
  </div>
</div>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing-xxl));
}
</style>
