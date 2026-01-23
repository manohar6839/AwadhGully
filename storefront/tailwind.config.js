/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        awadh: {
          maroon: '#5A0F1B',
          gold: '#C9A24D',
          ivory: '#FAF7F2',
          charcoal: '#1E1E1E',
          saffron: '#E07A2D',
        },
        swiggy: '#FC8019',
        zomato: '#CB202D',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-poppins)', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(to right, rgba(20, 5, 8, 0.85), rgba(90, 15, 27, 0.4), transparent), url('https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=2088&auto=format&fit=crop')",
      }
    },
  },
  plugins: [],
}
