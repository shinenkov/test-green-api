import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const greenAPI = env.GREEN_API
  const proxyConfigLocal = {
    '/green': {
      target: greenAPI,
      changeOrigin: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rewrite: (path: any) => path.replace(/\/green/, '')
    },
  }

  return {
    plugins: [react()],
    server: {
      port: 3001,
      proxy: proxyConfigLocal
    }
  }
})
