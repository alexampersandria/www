export type FadeinOptions = {
  maxIndex?: number
}

/**
 * aplies fadein classes to all elements within the node that contain text
 * and are not themselves children of other elements with text
 * and adds the 'fadein' class to them and 'fadein-[index]' for staggered animations
 * @param node
 */
export const fadein = (
  node: HTMLElement,
  options: FadeinOptions = {
    maxIndex: 99,
  },
) => {
  node.classList.add('fadein-root')
  let index = 0
  const elements = node.querySelectorAll<HTMLElement>('*:not(:empty), img')
  elements.forEach(el => {
    if (
      !el.classList.contains('fadein') &&
      !el.classList.contains('no-fadein')
    ) {
      if (!parentHasFadeinClass(el.parentNode)) {
        const hasDirectText = Array.from(el.childNodes).some(
          node =>
            node.nodeType === Node.TEXT_NODE && node.textContent?.trim().length,
        )
        const isImage = el.tagName.toLowerCase() === 'img'
        if (hasDirectText || isImage) {
          el.classList.add('fadein', `fadein-${index}`)
          if (options.maxIndex) {
            if (index < options.maxIndex) {
              index++
            }
          } else {
            index++
          }
        }
      }
    }
  })

  // finally add fadein and fadein-[index] to parents of all nodes that have fadein class
  // if parent contains multiple children with fadein class, only add once for the lowest index
  const fadeinElements = node.querySelectorAll<HTMLElement>('.fadein')
  fadeinElements.forEach(el => {
    const fadeinIndices = Array.from(el.classList)
      .map(cls => {
        const match = cls.match(/^fadein-(\d+)$/)
        return match ? parseInt(match[1], 10) : null
      })
      .filter(num => num !== null) as number[]
    const fadeinIndex = Math.min(...fadeinIndices)

    let parent = el.parentElement
    while (parent) {
      if (!parent.classList.contains('fadein')) {
        parent.classList.add('fadein', `fadein-${fadeinIndex}`)
      }
      if (parent === node) break
      parent = parent.parentElement
    }
  })
}

const parentHasFadeinClass = (node: Node | null): boolean => {
  if (!node) return false
  if (node instanceof HTMLElement && node.classList.contains('fadein'))
    return true
  return parentHasFadeinClass(node.parentNode)
}
