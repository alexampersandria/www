<script lang="ts">
import { useHeartRateStore } from '$lib/stores/hr.store.svelte'
import Card from '$lib/components/ui/Card.svelte'

const model = useHeartRateStore()

const text = $derived.by(() => {
  if (model.restingHeartRate === undefined && model.maxHeartRate === undefined) {
    return 'Input your resting and max heart rate to calculate your heart rate zones'
  } else if (model.restingHeartRate === undefined) {
    return 'Resting heart rate is required to calculate your heart rate zones'
  } else if (model.restingHeartRate <= 0) {
    return 'Resting heart rate must be greater than 0'
  } else if (model.maxHeartRate === undefined) {
    return 'Max heart rate is required to calculate your heart rate zones'
  } else if (model.maxHeartRate <= 0) {
    return 'Max heart rate must be greater than 0'
  } else if (model.maxHeartRate <= model.restingHeartRate) {
    return 'Max heart rate must be greater than your resting heart rate'
  } else if (!model.zones) {
    return 'Could not calculate heart rate zones'
  }
})
</script>

{#if text}
  <Card>
    <div class="muted">
      {text}
    </div>
  </Card>
{/if}
