<script lang="ts">
import type { Release } from '$lib/types/music'
import { formatId } from '$lib/utils/id'
import { formatReleaseType } from '$lib/utils/music'
import { formatDate, formatSeconds } from '$lib/utils/time'

let {
  release,
}: {
  release: Release
} = $props()

let totalDuration = $derived.by(() => {
  if (release.tracks && release.tracks.length > 0) {
    return release.tracks.reduce((sum, track) => sum + (track.duration || 0), 0)
  }
  return null
})

let showTracklist = $derived.by(() => {
  return (
    release.type !== 'single' && release.tracks && release.tracks.length > 1
  )
})
</script>

<div class="release">
  <div class="release-info">
    <div class="flex space-between">
      <h3 id={formatId(release.title)} class="nostyle release-title">
        {release.title}
      </h3>

      <div class="release-date">
        {formatDate(release.releaseDate)}
      </div>
    </div>

    <div class="release-meta">
      <div class="release-type">
        {formatReleaseType(release.type)}
      </div>

      {#if showTracklist && release.tracks}
        <div class="release-trackcount">
          {release.tracks.length} items
        </div>
      {/if}

      {#if totalDuration}
        <div class="release-duration">
          {#if release.type !== 'single'}{/if}
          {formatSeconds(totalDuration)}
        </div>
      {/if}
    </div>
  </div>

  {#if release.links && release.links.length > 0}
    <div class="release-links">
      Buy / Listen
      <div class="links">
        {#each release.links as link}
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        {/each}
      </div>
    </div>
  {/if}

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
  gap: var(--padding-xs);
  color: var(--text-primary);

  &:has(*:target) {
    position: relative;

    &:after {
      content: '';
      display: block;
      --padding: var(--padding-s);
      --size: calc(100% + var(--padding) * 2);
      height: var(--size);
      width: var(--size);
      position: absolute;
      top: calc(-1 * var(--padding));
      left: calc(-1 * var(--padding));
      z-index: -1;
      border-radius: var(--radius-s);

      box-shadow: 0 0 0 var(--focus-shadow-offset) var(--text-accent);

      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 var(--focus-shadow-offset) var(--text-accent);
        }
        20% {
          box-shadow: 0 0 0 var(--focus-shadow-offset) var(--text-secondary);
        }
        60% {
          box-shadow: 0 0 0 var(--focus-shadow-offset) var(--text-accent);
        }
      }

      animation: pulse 4s infinite;
    }
  }

  .release-date {
    color: var(--text-secondary);
  }

  .release-duration {
    color: var(--text-secondary);
  }

  .release-meta {
    display: flex;
    gap: var(--padding-m);
    color: var(--text-secondary);
  }

  .links {
    display: flex;
    gap: var(--padding-s);
  }

  .tracklist {
    .track {
      display: flex;
      gap: var(--padding-s);

      .track-number {
        width: 2ch;
        color: var(--text-secondary);
      }

      .track-duration {
        margin-left: auto;
        color: var(--text-secondary);
      }
    }
  }
}
</style>
