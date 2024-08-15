import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        bgChange: {
          '0%': { backgroundColor: '#e2e8f0' },
          '100%': { backgroundColor: '#ffffff' },
        },
      },
      animation: {
        bgChange: 'bgChange 4s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
