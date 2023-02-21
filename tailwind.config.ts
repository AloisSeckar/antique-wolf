// https://tailwindcss.com/docs/configuration
// https://tailwindcss.com/docs/plugins

import plugin from 'tailwindcss/plugin'

module.exports = {
  content: [
    './src/**/*.{html,js,vue}'
  ],
  theme: {
    extend: {
      colors: {
        feature: '#3CB371'
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.text-feature': {
          color: theme('colors.feature')
        }
      })
    })
  ]
}
