<script lang="ts">
import { type BlogPost } from '$lib/shared/data/blog.svelte'
import { fadein } from '$lib/shared/actions/fadein.svelte'
import TagList from '$lib/components/blog/TagList.svelte'

let { post }: { post: BlogPost } = $props()
</script>

<div class="blog-post-metadata" use:fadein>
  <div class="app-page">
    <div class="container">
      <div class="header">
        <a href="/blog" class="back"> &larr; Blog</a>
        <table>
          <tbody>
            <tr>
              <td> title </td>
              <td>
                {post.metadata?.title || post.id}
              </td>
            </tr>
            <tr>
              <td> date </td>
              <td>
                {post.metadata?.date}
              </td>
            </tr>
            <tr>
              <td> tags </td>
              <td>
                <TagList tags={post.metadata?.tags} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
.blog-post-metadata {
  .app-page {
    padding-block-end: 0;
  }

  .header {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-m);
  }
}
</style>
