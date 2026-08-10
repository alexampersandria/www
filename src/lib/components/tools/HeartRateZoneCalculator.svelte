<script lang="ts">
import HeartRateZoneGraph from '$lib/components/tools/HeartRateZoneGraph.svelte'
import HeartRateZoneInputs from '$lib/components/tools/HeartRateZoneInputs.svelte'
import HeartRateZoneMissing from '$lib/components/tools/HeartRateZoneMissing.svelte'
</script>

<div class="hr-zone-calculator fadein">
  <HeartRateZoneInputs />
  <HeartRateZoneGraph />
  <HeartRateZoneMissing />
</div>

<style lang="scss">
.hr-zone-calculator {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
  margin-block-end: var(--spacing-l);
}
</style>
