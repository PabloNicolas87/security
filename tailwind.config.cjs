module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'chat-user': {
          light: 'rgb(219 234 254)',
          dark: 'rgb(30 58 138)',
        },
      },
    },
  },
  plugins: [],
};
