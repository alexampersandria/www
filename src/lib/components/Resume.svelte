<script lang="ts">
import { resume } from '$lib/data/resume'
import { formatId } from '$lib/utils/id'
</script>

<div class="resume">
  {#if resume.background}
    <div class="section background">
      <div id="background" class="section-title">Background</div>
      <div class="section-content">
        {resume.background}
      </div>
    </div>
  {/if}

  {#if resume.positions.length > 0}
    <div class="section positions">
      <div id="positions" class="section-title">Positions</div>
      <div class="section-content">
        {#each resume.positions as position}
          {@const multirole = position.roles.length > 1}
          {@const positionId = formatId(position.company)}
          <div class="position" class:multirole>
            <div class="flex space-between">
              <div id={positionId} class="company">
                {position.company}
              </div>
              <div class="period">
                {#if !multirole}
                  <div class="from">{position.roles[0].period.from}</div>
                  <div class="to">{position.roles[0].period.to}</div>
                {:else}
                  {@const startingRole =
                    position.roles[position.roles.length - 1]}
                  {@const latestRole = position.roles[0]}
                  <div class="from">{startingRole.period.from}</div>
                  <div class="to">{latestRole.period.to}</div>
                {/if}
              </div>
            </div>
            <div class="roles">
              {#each position.roles as role}
                {@const roleId = formatId(role.title)}
                <div class="role">
                  <div id={`${positionId}-${roleId}`} class="title">
                    {role.title}
                  </div>
                  {#if multirole}
                    <div class="period">
                      <div class="from">{role.period.from}</div>
                      <div class="to">{role.period.to}</div>
                    </div>
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
        {/each}
      </div>
    </div>
  {/if}

  {#if resume.education.length > 0}
    <div class="section education">
      <div id="education" class="section-title">Education</div>
      <div class="section-content">
        {#each resume.education as school}
          {@const schoolId = formatId(school.institution)}
          <div class="school">
            <div class="flex space-between">
              <div id={schoolId} class="institution">
                {school.institution}
              </div>
              <div class="period">
                <div class="from">{school.period.from}</div>
                <div class="to">{school.period.to}</div>
              </div>
            </div>
            <div class="flex space-between">
              <div class="degree">{school.degree}</div>
              {#if !school.completed}
                <div class="incomplete">*Incomplete</div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
.resume {
  display: flex;
  flex-direction: column;
  gap: var(--padding-l);

  .background,
  .description {
    hyphens: auto;
  }

  .section {
    display: grid;
    grid-template-columns: 10rem 1fr;

    @media screen and (max-width: 919px) {
      grid-template-columns: 1fr;
      gap: var(--padding-m);

      .section-title {
        font-size: var(--font-size-l);
      }
    }

    .section-title {
      font-weight: 600;
    }

    .section-content {
      display: flex;
      flex-direction: column;
      gap: var(--padding-m);

      .company,
      .institution {
        font-weight: 600;
      }

      .position.multirole {
        display: flex;
        flex-direction: column;
        gap: var(--padding-s);

        .roles {
          display: flex;
          flex-direction: column;
          gap: var(--padding-s);

          padding-left: var(--padding-m);
          border-left: 2px solid var(--text-accent);
        }
      }
    }
  }

  .incomplete {
    color: var(--text-secondary);
  }
}
</style>
