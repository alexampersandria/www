import { SvelteDate } from 'svelte/reactivity'

export type BlogPostMetadata = {
  title: string
  date: string
  tags: string[]
}

export type BlogPost = {
  id: string
  path: string
  metadata?: BlogPostMetadata
}

let posts: BlogPost[] | undefined = $state()

export const getPost = async (id: string) => {
  if (!posts) await loadPosts()
  return posts?.find(post => post.id === id)
}

export const loadPosts = async () => {
  const routes = import.meta.glob('/src/routes/blog/post/**/+page.{svelte,svx,md}')
  posts = await Promise.all(
    Object.entries(routes).map(async ([path, load]) => {
      const routeSegments = path.split('/')
      const id = routeSegments[routeSegments.length - 2] || ''
      const post = (await load()) as { metadata?: BlogPostMetadata }
      return { id, path, metadata: post.metadata }
    }),
  )
}

export const getPosts = async (direction: 'asc' | 'desc' = 'desc') => {
  if (!posts) await loadPosts()
  const sorted = posts?.toSorted((a, b) => {
    return new SvelteDate(b.metadata?.date).getTime() - new SvelteDate(a.metadata?.date).getTime()
  })
  return direction === 'desc' ? sorted : sorted?.reverse()
}
