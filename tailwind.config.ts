// tailwind.config.ts
import type { Config } from 'tailwindcss';
import spitalTheme from './src/content/Spital/spitalTheme.ts';
import tailwindScrollbar from 'tailwind-scrollbar';

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      ...spitalTheme,
    },
  },
  plugins: [tailwindScrollbar],
};

export default config;
