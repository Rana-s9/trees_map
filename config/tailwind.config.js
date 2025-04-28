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
        'moss-green': '#9CB98D',
        'olive-green': '#92B58A',
        'sage-green': '#AFC9A8',
        'dry-khaki': '#B0B79C',
        'sand-beige': '#D1B88F',
        'camel': '#C7A276',
        'terra-cotta': '#B78466',
        'orange-brown': '#B88F77',
        'duck-blue': '#87A9BA',
        'fog-blue': '#A8C2CF',
        'grayish-blue': '#AFC3CA',
        'ice-blue': '#D0EDF5',
        'jungle-green': '#7DAF82',
        'pale-blue-green': '#A7C9D1',
        'surf-mint': '#A1C4BD',
        'lavender': '#B7A7C0',
        'greige-rose': '#CBA6A7',
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
