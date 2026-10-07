/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        harvest: {
          dark: '#14281E',
          forest: '#1B3B2B',
          forestHover: '#153123',
          moss: '#29543B',
          leaf: '#35774D',
          leafLight: '#EAF4EC',
          sage: '#6D8E74',
          sageLight: '#DDE9E0',
          sprout: '#F1F7F2',
          cream: '#FBF9F5',
          creamMuted: '#F4EFEA',
          sand: '#E9E3D5',
          earth: '#2B241E',
          clay: '#8A5A44',
          terracotta: '#C76340',
          terracottaHover: '#B25332',
          terracottaLight: '#FAECE6',
          ochre: '#D89437',
          ochreLight: '#FCF3E5',
          border: '#E6E1D6',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(27, 59, 43, 0.06)',
        'float': '0 20px 40px -15px rgba(20, 40, 30, 0.12)',
        'glow': '0 0 25px rgba(53, 119, 77, 0.18)',
      }
    },
  },
  plugins: [],
}
