import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const mockHOST = env.MOCK_HOST
  const greenAPI = env.GREEN_API

  const proxyConfigLocal = {
    '/mock': {
      target: mockHOST,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/\/mock/, '')
    },
    '/green': {
      target: greenAPI,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/\/green/, '')
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
