import tailwindcss from "@tailwindcss/vite"
import { config } from 'dotenv';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
    
  // Application configuration
  app: {
      head: {
          title: 'Journease AI',
          meta: [
              { charset: 'utf-8' },
              { name: 'viewport', content: 'width=device-width, initial-scale=1' },
              { name: 'description', content: 'Journease AI' }
          ],
          link: [
              { rel: 'icon', type: 'image/svg+xml', href: '/journease-icon.svg' }
          ]
      }
  },
  
  // Runtime configuration
  runtimeConfig: {
      public: {
          // apiUrl: process.env.API_URL || 'http://localhost:8081/api/v1',
      }
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: ['@nuxt/icon'],
})