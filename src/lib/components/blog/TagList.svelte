<script lang="ts">
let {
  tags,
}: {
  tags?: string[]
} = $props()
</script>

<div class="tags">
  {#if tags && tags.length > 0}
    {#each tags as tag, index}
      <div class="tag">
        <a class="tag-link" href={`/blog?tag=${tag}`}>
          {tag}
        </a>
        {#if index !== tags.length - 1}
          <div class="comma">,</div>
        {/if}
      </div>
    {/each}
  {:else}
    <div class="no-tags muted">none</div>
  {/if}
</div>

<style lang="scss">
.tags {
  display: flex;
  gap: var(--spacing-s);

  .tag {
    display: flex;
    align-items: center;
    gap: 0;
  }
}
</style>
