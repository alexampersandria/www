export const themeList = ['paper', 'moon', 'lavender', 'forest', 'cornflower', 'campfire'] as const
export type Theme = (typeof themeList)[number]

export type ThemeModel = {
  theme?: Theme
}

const isValidTheme = (value: unknown): value is Theme => themeList.includes(value as Theme)
const defaultTheme: Theme = themeList[0]

let theme: Theme = $state(defaultTheme)

export const useThemeStore: () => ThemeModel = () => {
  return {
    get theme() {
      if (isValidTheme(theme)) return theme
      else return defaultTheme
    },
    set theme(value: Theme) {
      theme = value
    },
  }
}
