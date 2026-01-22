// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8080/api/v1',
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
      cloudinaryUploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET || ''
    }
  },
  modules: ['@nuxt/icon', '@nuxt/image', '@nuxt/fonts', '@nuxtjs/tailwindcss'],
  fonts: {
    families: [
      { name: 'Lexend', provider: 'google' },
      { name: 'Gravitas One', provider: 'google' },
      { name: 'IBM Plex Sans', provider: 'google' }
    ]
  }
})