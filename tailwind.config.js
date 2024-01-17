import { colors } from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '350px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      accent: '#73AAF0',
      toastSecondary: "#cbe3ff",
      toastPrimary: "#4183ea",
      primary: '#0B68E1',
      black: '#000000',
      error: '#FF0000',
      success: '#008000',
      white: {
        600: '#F5F5F5',
        500: '#FFF',
      },
      ...colors
    },
    extend: { },
  },
  plugins: [],
}

