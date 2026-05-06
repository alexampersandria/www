import { registerStore } from 'sv-store'
import { useThemeStore } from '$lib/stores/theme.store.svelte'

export const initStores = () => {
  registerStore('theme', useThemeStore(), {
    tabSynchronization: true,
  })
}
