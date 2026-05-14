<script lang="ts">
import { goto } from '$app/navigation'
import { page } from '$app/state'
import TagList from '$lib/components/blog/TagList.svelte'
import { getPosts, type BlogPost } from '$lib/shared/data/blog.svelte'
import { fadein } from '$lib/shared/actions/fadein.svelte'
import { onMount } from 'svelte'

let sortDirection: 'asc' | 'desc' = $state('desc')
const switchSortDirection = () => (sortDirection = sortDirection === 'asc' ? 'desc' : 'asc')
const sortSymbol = $derived(sortDirection === 'desc' ? '↓' : '↑')

type Filters = {
  tags?: string[]
}

const filters: Filters = $derived.by(() => {
  const searchParams = page.url.searchParams
  const tags = searchParams.get('tags')
  if (tags) return { tags: tags.split(',') }
  const tag = searchParams.get('tag')
  if (tag) return { tags: [tag] }
  return {}
})

let posts: BlogPost[] | undefined = $state()

const loadPosts = async () => {
  posts = await getPosts(sortDirection)
  if (!filters.tags) return posts
  return posts?.filter(post => post.metadata?.tags.some(tag => filters.tags?.includes(tag)))
}

onMount(loadPosts)

const clearFilters = () => {
  goto('/blog')
}
</script>

<div class="app-page">
  <div class="container">
    <div class="blog-page">
      <div class="page-title">
        <h1 class="nostyle flex">
          <div class="highlight">blog</div>
        </h1>
      </div>

      {#if filters.tags}
        <div class="filter">
          <div class="left">
            <div class="title">filter:</div>
            <div class="tags">
              {#each filters.tags as tag, index}
                <div class="tag">
                  tag:{tag}{#if index < filters.tags.length - 1},{/if}
                </div>
              {/each}
            </div>
          </div>
          <button onclick={clearFilters}> clear filters </button>
        </div>
      {/if}

      <div class="posts">
        <table>
          <thead>
            <tr>
              <th> title </th>
              <th>
                <button class="plain" onclick={switchSortDirection}>
                  date
                  {sortSymbol}
                </button>
              </th>
              <th> tags </th>
            </tr>
          </thead>
          {#key JSON.stringify(filters)}
            <tbody use:fadein>
              {#each posts as post}
                <tr>
                  <td>
                    <a href={`/blog/post/${post.id}`}>
                      {post.metadata?.title}
                    </a>
                  </td>
                  <td>
                    {post.metadata?.date}
                  </td>
                  <td>
                    <TagList tags={post.metadata?.tags} />
                  </td>
                </tr>
              {/each}
            </tbody>
          {/key}
        </table>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
.blog-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-l);

  .page-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--spacing-m);
  }

  .filter {
    display: flex;
    align-items: center;
    gap: var(--spacing-m);
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;
      gap: var(--spacing-s);
    }

    .title {
      font-weight: 700;
    }

    .tags {
      display: flex;
      gap: var(--spacing-s);
    }
  }
}
</style>
