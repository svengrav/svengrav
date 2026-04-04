import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import tsconfigPaths from 'vite-tsconfig-paths';
import { execSync } from 'child_process';

const buildNumber = execSync('git rev-list --count HEAD').toString().trim();

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __BUILD_NUMBER__: JSON.stringify(buildNumber),
  },
  plugins: [react(), tsconfigPaths()],
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  }
})
