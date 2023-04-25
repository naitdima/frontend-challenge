import { defineConfig } from "vite"
import { fileURLToPath, URL } from "node:url"

import vue from "@vitejs/plugin-vue"
import svgLoader from "vite-svg-loader"

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    vue(),
    svgLoader()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
})
