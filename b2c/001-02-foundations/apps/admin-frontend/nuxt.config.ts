// Nuxt 3 minimal SSR
export default defineNuxtConfig({
  devtools: false,
  typescript: { strict: true },
  runtimeConfig: {
    // Environnements à l’exécution (serveur uniquement)
    INTERNAL_ADMIN_API_URL: process.env.INTERNAL_ADMIN_API_URL || 'http://admin-api:3001'
  },

  compatibilityDate: '2025-10-27'
});
