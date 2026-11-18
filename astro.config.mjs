// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const defaultSite = isGitHubActions ? 'https://teddymwai.github.io' : 'https://tedcraft.dev';
const defaultBase = isGitHubActions ? '/TedCraft' : '/';

export default defineConfig({
  site: process.env.SITE_URL || defaultSite,
  base: process.env.BASE_PATH || defaultBase,
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [mdx(), sitemap()]
});
