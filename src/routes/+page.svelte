<script lang="ts">
import Contact from '$lib/views/sections/Contact.svelte'
import Projects from '$lib/views/sections/Projects.svelte'
import Resume from '$lib/views/sections/Resume.svelte'
import Me from '$lib/views/sections/Me.svelte'
import DiscographyList from '$lib/views/music/DiscographyList.svelte'
</script>

<div class="app-page">
  <div class="container">
    <div class="home">
      <Me />
      <Resume background={false} education={false} />
      <Projects limit={2} />
      <DiscographyList />
      <Contact />
    </div>
  </div>
</div>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing-xl));
}
</style>
