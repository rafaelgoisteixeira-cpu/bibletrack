// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://officinabenedicta.com.br',
  base: '/bibletrack',
  adapter: cloudflare(),
});
