<script lang="ts">
import { useHeartRateStore } from '$lib/stores/hr.store.svelte'

const model = useHeartRateStore()
</script>

{#if model.zones}
  <div class="hr-zones-container">
    <div class="hr-zones">
      {#each model.zones as zone, index (index)}
        <div class="zone zone-{index + 1}">
          <div class="thresholds">
            <div class="threshold min">
              {zone.min}
            </div>
            <div class="threshold max">
              {zone.max}
              {#if index === model.zones.length - 1}
                +
              {/if}
            </div>
          </div>
          <div class="bar"></div>
          <div class="label">
            Z{index + 1}
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style lang="scss">
.hr-zones-container {
  container-type: inline-size;
  container-name: hr-zones;

  .hr-zones {
    display: flex;
    flex-direction: row;
    align-items: center;

    --zone-height: var(--spacing-xl);

    --default-transition-duration: 0.3s;
    --transition-duration: var(--default-transition-duration);

    .zone {
      flex: 1;

      .bar,
      .threshold,
      .label {
        transition: background-color var(--transition-duration) linear;
        white-space: nowrap;
      }

      .thresholds {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .threshold {
          font-size: var(--font-size-s);
          padding: var(--spacing-s);
          background-color: var(--color-background-secondary);
        }
      }

      .label {
        font-size: var(--font-size-s);
        padding: var(--spacing-s);
        background-color: var(--color-background-secondary);
        text-align: center;
      }

      .bar {
        height: var(--zone-height);
        background-color: var(--color-foreground);
      }

      &:not(.zone-1) {
        .thresholds {
          justify-content: flex-end;

          .min {
            display: none;
          }
        }
      }

      @container hr-zones (max-width: 500px) {
        &.zone-1 {
          .thresholds {
            justify-content: flex-end;

            .min {
              display: none;
            }
          }
        }
      }

      @for $i from 1 through 5 {
        &.zone-#{$i} {
          --transition-duration: calc(var(--default-transition-duration) * #{$i} * 0.25);

          .bar {
            opacity: ($i / 5);
          }
        }
      }
    }
  }
}
</style>
