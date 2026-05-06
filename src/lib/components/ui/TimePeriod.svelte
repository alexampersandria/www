<script lang="ts">
import type { Period } from '$lib/shared/data/resume'

let { from, to }: Period = $props()
</script>

<div class="time-period">
  <div class="from">
    {from}
  </div>
  <div class="arrow">→</div>
  <div class="to">
    {to}
  </div>
</div>

<style lang="scss">
.time-period {
  display: flex;
  gap: var(--spacing-s);
  align-items: center;
  white-space: nowrap;
}
</style>
