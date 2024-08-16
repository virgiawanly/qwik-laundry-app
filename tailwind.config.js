/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: {
          50: '#FFEBF0',
          100: '#FFD6E0',
          200: '#FFA8BE',
          300: '#FF809F',
          400: '#FF5781',
          500: '#FF2C5F',
          600: '#F0003C',
          700: '#B3002D',
          800: '#75001D',
          900: '#3D000F',
          950: '#1F0008',
        },
        secondary: {
          50: '#FFF4EB',
          100: '#FFE9D6',
          200: '#FFCFA8',
          300: '#FFB980',
          400: '#FFA257',
          500: '#FF8C2C',
          600: '#F06C00',
          700: '#B35000',
          800: '#753500',
          900: '#3D1C00',
          950: '#1F0E00',
        },
        tertiary: {
          50: '#F4EBFF',
          100: '#E9D6FF',
          200: '#CFA8FF',
          300: '#B980FF',
          400: '#A257FF',
          500: '#8C2CFF',
          600: '#6C00F0',
          700: '#5000B3',
          800: '#350075',
          900: '#1C003D',
          950: '#0E001F',
        },
        surface: {
          light: '#ffffff',
          25: '#fcfbfc',
          50: '#f3f3f3',
          100: '#e6e6e6',
          150: '#dadada',
          200: '#cecece',
          250: '#c1c1c1',
          300: '#b5b5b5',
          350: '#a9a9a9',
          400: '#9c9c9c',
          450: '#909090',
          500: '#848484',
          550: '#777777',
          600: '#6b6b6b',
          650: '#5e5e5e',
          700: '#525252',
          750: '#464646',
          800: '#393939',
          850: '#2d2d2d',
          900: '#212121',
          950: '#141414',
          dark: '#101010',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
