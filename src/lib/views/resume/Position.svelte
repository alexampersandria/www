<script lang="ts">
import Company from '$lib/components/resume/Company.svelte'
import TimePeriod from '$lib/components/ui/TimePeriod.svelte'
import { formatId } from '$lib/shared/utils/id'
import type { Position } from '$lib/shared/data/resume'

let {
  position,
}: {
  position: Position
} = $props()

const multirole = $derived(position.roles.length > 1)
const positionId = $derived(formatId(position.company.name))
</script>

<div class="position" class:multirole>
  <div class="company-info">
    <div id={positionId} class="company">
      <Company {...position.company} />
    </div>
    {#if !multirole}
      <TimePeriod from={position.roles[0].period.from} to={position.roles[0].period.to} />
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
  .company-info {
    display: flex;
    justify-content: space-between;
    column-gap: var(--spacing-m);
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .company {
      font-weight: var(--font-weight-bold);
      color: var(--color-foreground);
    }
  }

  &.multirole {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-s);

    .roles {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-s);

      padding-left: var(--spacing-m);
      border-left: 2px dashed var(--color-border);

      .role .title {
        color: var(--color-foreground);
      }
    }
  }
}
</style>
