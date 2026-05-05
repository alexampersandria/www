export type Link = {
  label: string
  href: string
  target?: '_blank' | '_self' | '_parent' | '_top'
}

export const links: Link[] = [
  { label: 'GitHub', href: 'https://github.com/alexampersandria' },
  { label: 'Instagram', href: 'https://www.instagram.com/bruchumlaut' },
  { label: 'Twitter', href: 'https://twitter.com/bruchumlaut' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/liaraio' },
]
