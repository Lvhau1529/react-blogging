/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Montserrat', 'san-serif']
      },
      colors: {
        primary: '#1DC071',
        secondary: '#A4D96C',
        grayDark: '#292D32',
        grayLight: '#E7ECF3',
        tertiary: '#3A1097',
        accent: '#00D1ED',
        grayF3: '#F3EDFF',
        gray6B: '#6B6B6B',
        gray23: '#232323',
        gray4b: '#4B5264',
        grayf1: '#F1F1F3',
        gray80: '#808191',
        black: '#171725',
        textInput: '#84878b'
      }
    }
  },
  plugins: []
}
