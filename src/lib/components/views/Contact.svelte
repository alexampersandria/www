<script>
import { me } from '$lib/data/me'
import Link from '../Link.svelte'

let links = $derived.by(() => {
  return me.links
})
</script>

<div class="contact flex column gapy-l">
  <div class="title flex">
    <h2 id="contact" class="nostyle highlight">Contact</h2>
  </div>

  <div class="info">
    {#if me.email}
      <div class="email flex gapx-m space-between">
        <div class="pre-link">Get in touch via</div>

        <Link href={`mailto:${me.email}`} label={me.email} />
      </div>
    {/if}

    {#if links}
      <div class="resume-links flex gapx-m space-between">
        <div class="pre-link">Or find me at</div>

        <div class="links flex gapx-s">
          {#each links as link, index}
            {#if links.length > 1 && index === links.length - 1}
              <div class="or">or</div>
            {/if}
            <Link {...link} />
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>
