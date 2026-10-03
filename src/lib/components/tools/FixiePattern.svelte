<script lang="ts">
import { useFixiePatternStore } from '$lib/stores/fixie-pattern.store.svelte'
import Input from '$lib/components/ui/Input.svelte'
import Button from '$lib/components/ui/Button.svelte'
import { capDecimals } from '$lib/shared/utils/number'

const fixiePatternStore = useFixiePatternStore()
</script>

<div class="fixie-pattern">
  <div class="reference">
    <div class="title">
      <h2>Reference</h2>
    </div>

    <div class="inputs">
      <div class="field pattern">
        <label for="pattern">Pattern measurement</label>
        <Input type="number" fullwidth bind:value={fixiePatternStore.reference.pattern} name="pattern" id="pattern" />
      </div>
      <div class="field yours">
        <label for="yours">Your measurement</label>
        <Input type="number" fullwidth bind:value={fixiePatternStore.reference.yours} name="yours" id="yours" />
      </div>
      <div class="field allowance">
        <label for="allowance">Seam Allowance</label>
        <Input
          type="number"
          fullwidth
          bind:value={fixiePatternStore.reference.allowance}
          name="allowance"
          id="allowance" />
      </div>
      <div class="field clear">
        <Button onclick={fixiePatternStore.clear}>Clear</Button>
      </div>
    </div>
  </div>

  <div class="factor">
    <div class="label muted">Scale Factor</div>
    <div class="value highlight">
      {#if fixiePatternStore.scale}
        {capDecimals(fixiePatternStore.scale)}x
      {/if}
    </div>
  </div>

  <div class="measurements">
    <div class="title">
      <h2>Measurements</h2>
    </div>

    {#each fixiePatternStore.measurements as measurement, index}
      {@const scaled = fixiePatternStore.scaledMeasurements?.find(s => s.id === measurement.id)}
      <div class="measurement">
        <div class="id">
          <label for={`${index}-id`}>ID</label>
          <Input fullwidth bind:value={measurement.id} name={`${index}-id`} id={`${index}-id`} />
        </div>
        <div class="value">
          <label for={`${index}-value`}>Value</label>
          <Input type="number" fullwidth bind:value={measurement.value} name={`${index}-value`} id={`${index}-value`} />
        </div>
        <div class="scaled">
          <label for={`${index}-scaled`}>Scaled</label>
          <Input type="number" fullwidth value={capDecimals(scaled?.value || 0)} disabled />
        </div>
        <div class="remove">
          <Button onclick={() => fixiePatternStore.remove(index)}>Delete</Button>
        </div>
      </div>
    {/each}

    <div class="add mt-xl">
      <Button fullwidth onclick={fixiePatternStore.add}>+ Add another measurement</Button>
    </div>
  </div>
</div>

<style lang="scss">
.fixie-pattern {
  container-type: inline-size;
  container-name: fixie-pattern-container;

  display: flex;
  flex-direction: column;
  gap: var(--spacing-l);

  .factor {
    display: flex;
    gap: var(--spacing-m);
    justify-content: space-between;
  }

  .reference {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-m);

    @container fixie-pattern-container (max-width: 600px) {
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

  .measurements {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-m);

    .measurement {
      display: flex;
      gap: var(--spacing-m);
      align-items: flex-end;
    }
  }
}
</style>
