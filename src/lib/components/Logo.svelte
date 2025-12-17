<script lang="ts">
import logo from '$lib/assets/img/liara.svg'
import smalllogo from '$lib/assets/img/lia.svg'

let {
  small = false,
}: {
  small?: boolean
} = $props()

let logoToUse = $derived.by(() => {
  return small ? smalllogo : logo
})
</script>

<img class="logo" src={logoToUse} alt="Logo" />

<style lang="scss">
img.logo {
  height: 1em;
}
</style>
