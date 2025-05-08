
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff4f4f',
        secondary: '#2c2c2c',
        whiter: '#f8f8f8',
        gray_white: '#f7f7f7',
        gray_whiter: '#f5f5f5',
        gray: '#6d6d6d',
        success: '#4caf50',
        warning: '#ff9800',
        danger: '#f44336',
      },
      fontFamily: {
        sans: ['var(--font-vazir)', 'Tahoma', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
