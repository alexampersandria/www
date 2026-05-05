import { registerStore } from 'sv-store'
import { useThemeStore } from './theme.store.svelte'

export const initStores = () => {
  registerStore('theme', useThemeStore(), {
    tabSynchronization: true,
  })
}
