export const formatReleaseType = (type: string): string => {
  switch (type) {
    case 'album':
      return 'Album'
    case 'ep':
      return 'EP'
    case 'single':
      return 'Single'
    case 'remix':
      return 'Remix'
    default:
      return type
  }
}
