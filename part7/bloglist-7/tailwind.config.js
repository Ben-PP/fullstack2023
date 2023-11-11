/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/app.jsx',
    './src/main.jsx',
    './src/components/**/*.jsx',
    './src/contexts/*.jsx'
  ],
  theme: {
    extend: {
      minWidth: {
        button: '8rem'
      },
      fontSize: {
        h1: '2.5rem',
        h2: '1.5rem'
      },
      fontWeight: {
        h1: 'font-bold',
        h2: 'font-bold'
      }
    }
  },
  plugins: []
}
