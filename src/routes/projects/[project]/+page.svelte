<script lang="ts">
import type { PageProps } from '../$types'

let { data }: PageProps = $props()
</script>

<div class="app-page">
  <a href="/projects" class="back"> ← Projects </a>

  <div class="project">
    <code><pre>{JSON.stringify(data, null, 2)}</pre></code>
  </div>
</div>
