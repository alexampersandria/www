<script lang="ts">
import Company from '$lib/components/Company.svelte'
import TimePeriod from '$lib/components/TimePeriod.svelte'
import { formatId } from '$lib/utils/id'
import type { Position } from '$lib/types/resume'

let {
  position,
}: {
  position: Position
} = $props()

const multirole = $derived(position.roles.length > 1)
const positionId = $derived(formatId(position.company.name))
</script>

<div class="position" class:multirole>
  <div class="flex space-between">
    <div id={positionId} class="company">
      <Company {...position.company} />
    </div>
    {#if !multirole}
      <TimePeriod
        from={position.roles[0].period.from}
        to={position.roles[0].period.to} />
    {:else}
      {@const startingRole = position.roles[position.roles.length - 1]}
      {@const latestRole = position.roles[0]}
      <TimePeriod from={startingRole.period.from} to={latestRole.period.to} />
    {/if}
  </div>
  <div class="roles">
    {#each position.roles as role}
      {@const roleId = formatId(role.title)}
      <div class="role">
        <div id={`${positionId}-${roleId}`} class="title">
          {role.title}
        </div>
        {#if multirole}
          <TimePeriod from={role.period.from} to={role.period.to} />
        {/if}
        {#if role.description}
          <div class="description">
            {role.description}
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
.position {
  .company {
    font-weight: var(--font-weight-bold);
    color: var(--color-text-strong);
  }

  &.multirole {
    display: flex;
    flex-direction: column;
    gap: var(--padding-s);

    .roles {
      display: flex;
      flex-direction: column;
      gap: var(--padding-s);

      padding-left: var(--padding-m);
      border-left: 2px dashed var(--color-background-tertiary);

      .role .title {
        color: var(--color-text-strong);
      }
    }
  }
}
</style>
