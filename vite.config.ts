import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Object3d from 'unplugin-object-3d/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    Object3d(), 
    AutoImport({
      dts: true,
      imports: ['vue']
    })
  ]
})
