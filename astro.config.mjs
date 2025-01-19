import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { defineConfig } from "astro/config";
import vercel from '@astrojs/vercel';
import markdoc from "@astrojs/markdoc";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import remarkCodeTitles from 'remark-code-titles';
import decapCmsOauth from "astro-decap-cms-oauth";
// ⚠  Use default import for the Svelte integration
import svelte from '@astrojs/svelte';

export default defineConfig({
  output: 'server',
  site: 'https://ink.paulapplegate.com',
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'css-variables',
    },
    remarkPlugins: [remarkCodeTitles],
  },
  integrations: [
    mdx(),
    markdoc(),
    svelte(),        // Default export as a function call
    tailwind({ applyBaseStyles: false }),
    sitemap(),
    decapCmsOauth(),
  ],
  vite: {
    plugins: [],
    resolve: {
      alias: {
        $: path.resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      allowNodeBuiltins: true,
    },
  },
  adapter: vercel(),
});