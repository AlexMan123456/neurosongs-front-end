import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import manifest from "./manifest.json"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA(
      {
        ...manifest,
        registerType: "autoUpdate",
        devOptions: {
          enabled: true
        }
      }
    )
  ],
})
