import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify('https://lbgugcnumubgfdmkrhft.supabase.co'),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiZ3VnY251bXViZ2ZkbWtyaGZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0Mzc2MjYsImV4cCI6MjA5NzAxMzYyNn0.rkn1vnH5PtqKE4uM2NGyD8F3FfguZlj6GkgiaXRd5XA'),
  },
  plugins: [
    devtools(),
    nitro({ 
  preset: process.env.NODE_ENV === 'production' ? 'cloudflare-pages' : 'node',
  rollupConfig: { external: [/^@sentry\//] } 
}),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})

export default config