<script lang="ts">
import Input from '$lib/components/ui/Input.svelte'
import { useHeartRateStore } from '$lib/stores/hr.store.svelte'
import Button from '$lib/components/ui/Button.svelte'

const model = useHeartRateStore()
</script>

<div class="hr-zones-inputs-container">
  <div class="hr-zones-inputs">
    <div class="inputs">
      <div class="field">
        <label for="restingHeartRate">Resting Heart Rate</label>
        <Input
          live
          fullwidth
          type="number"
          name="restingHeartRate"
          id="restingHeartRate"
          bind:value={model.restingHeartRate} />
      </div>
      <div class="field">
        <label for="maxHeartRate">Max Heart Rate</label>
        <Input live fullwidth type="number" name="maxHeartRate" id="maxHeartRate" bind:value={model.maxHeartRate} />
      </div>
      <div class="field clear">
        <Button onclick={model.clear}>Clear</Button>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
.hr-zones-inputs-container {
  container-type: inline-size;
  container-name: hr-zones-inputs-container;

  .hr-zones-inputs {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-m);

    @container hr-zones-inputs-container (max-width: 600px) {
      .inputs {
        flex-direction: column;
        gap: var(--spacing-m);
        justify-content: flex-start;
        align-items: flex-start;

        .field {
          width: 100%;
        }
      }
    }

    .inputs {
      display: flex;
      gap: var(--spacing-m);
      align-items: center;

      .field {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        &.clear {
          flex: 0;
          align-self: flex-end;
        }
      }
    }
  }
}
</style>
