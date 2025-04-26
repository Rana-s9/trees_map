const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}'
  ],
  theme: {
    extend: {
      colors: {
        'light-blue': '#A3B9C9',
        'midnight-blue': '#191970',
        'coral': '#ff7f50',
        'lemon': '#fffacd',
        'moss-green': '#B6C8A9',
        'olive-green': '#AFC6A3',
        'sage-green': '#CBDDC1',
        'dry-khaki': '#C4C9B2',
        'sand-beige': '#DCC9A4',
        'camel': '#D6B48C',
        'terra-cotta': '#C79B7C',
        'orange-brown': '#C9A58E',
        'duck-blue': '#A6BCC7',
        'fog-blue': '#B6C5CA',
        'grayish-blue': '#C8D6DA',
        'ice-blue': '#E4F1F5',
        'jungle-green': '#A3C9A8',
        'pale-blue-green': '#C8DDE4',
        'surf-mint': '#BFD7D2',
        'lavender': '#C8BFD1',
        'greige-rose': '#D8C1C3',
        'pink-red': '#db7093',
        'pink': '#ffc0cd',
        'light-pink': '#ffb6c1'
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/container-queries'),
  ]
}
