/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'music-card': 'repeat(auto-fit, minmax(238px, 1fr))',
        'dao-card': 'repeat(auto-fit, minmax(220px, 1fr))',
      },
      backgroundImage: {
        'shadow-gradient': 'linear-gradient(0deg, #111 0%, rgba(17, 17, 17, 0.10) 98.63%)',
        'shadow-gradient2': 'linear-gradient(0deg, #111 41.55%, rgba(17, 17, 17, 0.00) 98.63%)',
      },
    },
  },
  daisyui: {
    themes: ['lofi'],
  },
  plugins: [require('daisyui')],
}
