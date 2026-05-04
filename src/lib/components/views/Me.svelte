<script>
import { me } from '$lib/data/me'
</script>

<div class="header flex gap-l align-center">
  <div class="info">
    <div class="name highlight">
      {me.name}
    </div>
    {#if me.birthday}
      <div class="birthday">
        b. {me.birthday}
      </div>
    {/if}
  </div>
</div>
