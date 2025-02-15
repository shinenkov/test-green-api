import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const greenAPI = env.GREEN_API

  const proxyConfigLocal = {
    '/green': {
      target: greenAPI,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/\/green/, '')
    },
  }

  return {
    plugins: [react()],
    define: {
      "process.env": env,
    },
    server: {
      port: 3001,
      proxy: proxyConfigLocal
    },
    preview: {
      watch: {
        usePolling: true
      },
      host: true,
      strictPort: true,
      port: 8080,
      proxy: proxyConfigLocal
    }
  }
})
