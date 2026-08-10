import { registerStore } from 'sv-store'
import { useThemeStore } from '$lib/stores/theme.store.svelte'
import { useHeartRateStore } from '$lib/stores/hr.store.svelte'

export const initStores = () => {
  registerStore('theme', useThemeStore(), {
    tabSynchronization: true,
  })
  registerStore('hr', useHeartRateStore(), {
    tabSynchronization: true,
  })
}
