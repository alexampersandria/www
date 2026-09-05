<script lang="ts">
import type { Snippet } from 'svelte'

let {
  children,
  solid = false,
}: {
  children: Snippet
  solid?: boolean
} = $props()
</script>

<div class="card" class:solid>
  {@render children()}
</div>

<style lang="scss">
.card {
  padding: var(--spacing-l);
  border-radius: var(--radius-s);
  border: 1px solid var(--color-border);

  &.solid {
    background-color: var(--color-background-secondary);
    border: none;
  }
}
</style>
