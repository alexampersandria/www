<div class="loading-container">
  <div class="loading">
    <div class="text">loading</div>
    <div class="dots">
      {#each Array(3) as _i, index (index)}
        <div class="dot">.</div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .loading {
    &,
    .dots {
      display: flex;
    }

    .dots {
      .dot {
        --animation-duration: 1000ms;
        @keyframes blink {
          0%,
          65% {
            opacity: 1;
          }
          70% {
            opacity: 0;
          }
        }
        animation: blink var(--animation-duration) infinite;
        opacity: 0;
        &:nth-child(1) {
          animation-delay: 0s;
        }
        &:nth-child(2) {
          animation-delay: calc(var(--animation-duration) * 0.33);
        }
        &:nth-child(3) {
          animation-delay: calc(var(--animation-duration) * 0.66);
        }
      }
    }
  }
}
</style>
