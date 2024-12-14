// tailwind.config.ts
import type { Config } from 'tailwindcss';
import spitalTheme from './src/content/Spital/SpitalTheme.ts';
import baseTheme from './src/assets/baseTheme.ts';
import tailwindScrollbar from 'tailwind-scrollbar';

const spitalColors = spitalTheme.colors;
const baseColors = baseTheme.colors;

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ...spitalColors, 
        ...baseColors
      }
    },
  },
  plugins: [tailwindScrollbar],
};

export default config;
