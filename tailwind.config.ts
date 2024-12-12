// tailwind.config.ts
import type { Config } from 'tailwindcss';
import spitalTheme from './src/content/Spital/SpitalTheme.ts';
import baseTheme from './src/assets/baseTheme.ts';
import tailwindScrollbar from 'tailwind-scrollbar';

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      ...spitalTheme,
      ...baseTheme
    },
  },
  plugins: [tailwindScrollbar],
};

export default config;
