<script lang="ts">
import { page } from '$app/state'
import { getPost, type BlogPost } from '$lib/shared/data/blog.svelte'
import Metadata from '$lib/views/blog/Metadata.svelte'
import { onMount, type Snippet } from 'svelte'

let { children }: { children: Snippet } = $props()

let post: BlogPost | undefined = $state()

onMount(async () => {
  const id = page.route.id?.split('/').pop()
  if (id) post = await getPost(id)
})
</script>

<div class="blog-post">
  {#if post}
    <Metadata {post} />
  {/if}

  <div class="content">
    {@render children()}
  </div>
</div>
