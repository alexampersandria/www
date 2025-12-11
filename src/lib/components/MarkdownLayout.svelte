<script lang="ts">
let { children } = $props()
</script>

<div class="markdown-layout">
  <div class="app-page">
    <div class="container">
      {@render children()}
    </div>
  </div>
</div>
