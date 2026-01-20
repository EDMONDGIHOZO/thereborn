// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@nuxt/image', '@nuxt/fonts', '@nuxtjs/tailwindcss'],
  fonts: {
    families: [
      { name: 'Lexend', provider: 'google' },
      { name: 'Gravitas One', provider: 'google' },
      { name: 'IBM Plex Sans', provider: 'google' }
    ]
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:9090/api/v1'
    }
  }
})