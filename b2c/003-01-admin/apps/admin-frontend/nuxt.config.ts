// Nuxt 3 minimal SSR
export default defineNuxtConfig({
  devtools: false,
  typescript: { strict: true },
  modules: ['@pinia/nuxt'],
  runtimeConfig: {
    INTERNAL_ADMIN_API_URL: process.env.INTERNAL_ADMIN_API_URL || 'http://admin-api:3001'
  },
  compatibilityDate: '2025-10-27',
  app: { head: { title: 'Admin App' } },
});
