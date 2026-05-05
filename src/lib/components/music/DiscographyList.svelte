<script lang="ts">
import { discography, isMultiTrackType, type Release } from '$lib/data/music'
import { formatId } from '$lib/utils/id'
import { formatDate } from '$lib/utils/time'

const musicPageId = (release: Release) => {
  const id = formatId(release.title)
  return `/music/#${id}`
}

const buyLink = (release: Release) => {
  // prioritize bandcamp, then apple music, then just first link
  if (release.links) {
    const bandcamp = release.links.find(link =>
      link.label.toLowerCase().includes('bandcamp'),
    )
    if (bandcamp) return bandcamp

    const appleMusic = release.links.find(link =>
      link.label.toLowerCase().includes('apple music'),
    )
    if (appleMusic) return appleMusic

    return release.links[0]
  }
}
</script>

<div class="discography-list">
  <div class="title flex">
    <h2 id="music" class="nostyle highlight">Music</h2>
  </div>
  <div class="releases">
    <table class="release">
      <thead>
        <tr>
          <th class="release-title">Title</th>
          <th class="release-date">Release Date</th>
          <th class="track-count"># Tracks</th>
          <th class="external-link">Listen</th>
        </tr>
      </thead>
      <tbody>
        {#each discography as release}
          {@const buy = buyLink(release)}
          <tr>
            <td class="release-title"
              ><a href={musicPageId(release)}>{release.title}</a></td>
            <td class="release-date">{formatDate(release.releaseDate)}</td>
            <td class="track-count">
              {#if isMultiTrackType(release.type)}
                {release.tracks?.length ?? 0}
              {:else}
                {release.tracks?.length ?? 0}
                ({release.type})
              {/if}
            </td>
            <td class="external-link">
              {#if buy}
                <a href={buy.href}>{buy.label}</a>
              {:else}
                n/a
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="full-discography">
    <a href="/music"> → Full discography </a>
  </div>
</div>

<style lang="scss">
.discography-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-l);

  @media (max-width: 768px) {
    .track-count,
    .release-date {
      display: none;
    }
  }
}
</style>
