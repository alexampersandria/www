export const themeList = [
  'paper',
  'moon',
  'lavender',
  'forest',
  'cornflower',
  'campfire',
] as const
export type Theme = (typeof themeList)[number]

export type ThemeModel = {
  theme?: Theme
}

let theme: Theme = $state(themeList[0])

export const useThemeStore: () => ThemeModel = () => {
  return {
    get theme() {
      return theme
    },
    set theme(value: Theme) {
      theme = value
    },
  }
}
