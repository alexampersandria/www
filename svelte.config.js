import { mdsvex } from 'mdsvex'
import adapter from '@sveltejs/adapter-static'
import rehypeSlug from 'rehype-slug'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      precompress: false,
      strict: true,
      fallback: 'index.html',
    }),
  },
  preprocess: [
    mdsvex({
      extension: '.md',
      rehypePlugins: [rehypeSlug],
      layout: {
        _: __dirname + '/src/lib/components/MarkdownLayout.svelte',
      },
    }),
    vitePreprocess(),
  ],
  extensions: ['.svelte', '.svx', '.md'],
}

export default config
