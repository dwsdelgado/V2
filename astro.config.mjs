// @ts-check
import { defineConfig } from 'astro/config'

import icon from 'astro-icon'

import cloudflare from '@astrojs/cloudflare'

import sitemap from '@astrojs/sitemap';

import playformCompress from '@playform/compress'

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.darwindelgado.com',
  integrations: [
    icon({
      include: {
        carbon: [
          'logo-github',
          'logo-linkedin',
        ],
      },
    }),
    sitemap(),
    playformCompress()
  ],
  build: {
    inlineStylesheets: 'always',
  },
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
      experimental: { remoteBindings: true },
    },
    imageService: 'compile',
  }),
  vite: {
    plugins: [tailwindcss()],
  },
})