// third-party
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'RepoUtils',
      formats: ['es'],
      fileName: 'index',
    },
    sourcemap: true,
  },
})
