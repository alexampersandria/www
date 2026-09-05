<script lang="ts">
import { useHeartRateStore } from '$lib/stores/hr.store.svelte'

const model = useHeartRateStore()
</script>

{#if model.zones}
  <div class="hr-zones-table">
    <table>
      <thead>
        <tr>
          <th>Zone</th>
          <th>Min</th>
          <th>Max</th>
        </tr>
      </thead>
      <tbody>
        {#each model.zones as zone, index}
          <tr>
            <td>{index + 1}</td>
            <td>{zone.min}</td>
            <td>{zone.max}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
