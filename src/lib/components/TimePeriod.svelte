<script lang="ts">
import type { Period } from '$lib/types/resume'
import { ArrowRight } from 'lucide-svelte'

let { from, to }: Period = $props()
</script>

<div class="time-period">
  <div class="from">
    {from}
  </div>
  <div class="arrow">
    <ArrowRight />
  </div>
  <div class="to">
    {to}
  </div>
</div>

<style lang="scss">
.time-period {
  display: flex;
  gap: var(--padding-s);
  color: var(--text-secondary);
}
</style>
