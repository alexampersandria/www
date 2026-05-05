<script lang="ts">
import { formatId } from '$lib/utils/id'
import { formatReleaseType } from '$lib/utils/music'
import { formatDate, formatSeconds } from '$lib/utils/time'
import type { Release } from '$lib/data/music'
import Link from '../Link.svelte'

let {
  release,
  tracklist = true,
}: {
  release: Release
  tracklist?: boolean
} = $props()

let totalDuration = $derived.by(() => {
  if (release.tracks && release.tracks.length > 0) {
    return release.tracks.reduce((sum, track) => sum + (track.duration || 0), 0)
  }
  return null
})

let showTracklist = $derived.by(() => {
  if (!tracklist) return false
  return release.type !== 'single' && release.tracks && release.tracks.length > 1
})
</script>

<div class="release">
  <div class="release-info">
    <div class="flex space-between gapx-l">
      <h3 id={formatId(release.title)} class="nostyle release-title">
        {release.title}
      </h3>

      <div class="release-type highlight">
        {formatReleaseType(release.type)}
      </div>
    </div>

    <div class="release-meta">
      <div class="release-date">
        {formatDate(release.releaseDate)}
      </div>

      {#if showTracklist && release.tracks}
        <div class="release-trackcount">
          {release.tracks.length} tracks
        </div>
      {/if}

      {#if totalDuration}
        <div class="release-duration">
          {#if release.type !== 'single'}{/if}
          {formatSeconds(totalDuration)}
        </div>
      {/if}
    </div>

    {#if release.links && release.links.length > 0}
      <div class="release-links flex space-between gapx-l">
        Listen @
        <div class="links">
          {#each release.links as link, index}
            {#if release.links.length > 1 && index === release.links.length - 1}
              <div class="or">or</div>
            {/if}
            <Link {...link} />
          {/each}
        </div>
      </div>
    {/if}
  </div>

  {#if showTracklist}
    <div class="tracklist">
      {#each release.tracks as track, index}
        <div class="track">
          <div class="track-number">{index + 1}</div>
          <div class="track-title">{track.title}</div>
          {#if track.duration}
            <div class="track-duration">
              {formatSeconds(track.duration)}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
.release {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  color: var(--color-text);

  &:has(*:target) {
    position: relative;

    &:after {
      content: '';
      display: block;
      --padding: var(--spacing-s);
      --size: calc(100% + var(--padding) * 2);
      height: var(--size);
      width: var(--size);
      position: absolute;
      top: calc(-1 * var(--padding));
      left: calc(-1 * var(--padding));
      z-index: -1;
      border-radius: var(--radius-s);

      box-shadow: 0 0 0 var(--focus-shadow-offset) var(--color-text-muted);

      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 var(--focus-shadow-offset) var(--color-text-muted);
        }
        20% {
          box-shadow: 0 0 0 var(--focus-shadow-offset) var(--color-text);
        }
        60% {
          box-shadow: 0 0 0 var(--focus-shadow-offset) var(--color-text-muted);
        }
      }

      animation: pulse 4s infinite;
    }
  }

  .release-meta {
    --meta-gap: 1ch;
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--meta-gap);

    > * {
      &:not(:last-child) {
        &:after {
          content: '/';
          padding-inline-start: var(--meta-gap);
        }
      }
    }
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--spacing-s);
  }

  .tracklist {
    .track {
      display: flex;
      column-gap: var(--spacing-s);

      .track-number {
        width: 2ch;
      }

      .track-title {
        color: var(--color-text);
      }

      .track-duration {
        margin-left: auto;
      }

      .track-number,
      .track-duration,
      .track-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .track-number,
      .track-duration {
        flex-shrink: 0;
      }
    }
  }
}
</style>
