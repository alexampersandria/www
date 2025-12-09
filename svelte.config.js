import { mdsvex } from 'mdsvex'
import adapter from '@sveltejs/adapter-static'
import rehypeSlug from 'rehype-slug'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: { adapter: adapter() },
  preprocess: [
    mdsvex({
      extension: '.md',
      rehypePlugins: [rehypeSlug],
    }),
    vitePreprocess(),
  ],
  extensions: ['.svelte', '.svx', '.md'],
}

export default config
