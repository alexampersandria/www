<script lang="ts">
import TimePeriod from '$lib/components/TimePeriod.svelte'
import type { Education } from '$lib/types/resume'
import { formatId } from '$lib/utils/id'

let {
  institution,
}: {
  institution: Education
} = $props()

const institutionId = $derived(formatId(institution.institution))
</script>

<div class="institution">
  <div class="flex space-between">
    <div id={institutionId} class="institution-name">
      {institution.institution}
    </div>
    <TimePeriod from={institution.period.from} to={institution.period.to} />
  </div>
  <div class="flex space-between">
    <div class="degree">{institution.degree}</div>
    {#if !institution.completed}
      <div class="incomplete">*Incomplete</div>
    {/if}
  </div>
</div>

<style lang="scss">
.institution {
  .institution-name {
    font-weight: var(--font-weight-bold);
    color: var(--color-text-strong);
  }
}
</style>
