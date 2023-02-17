// https://tailwindcss.com/docs/configuration
// https://tailwindcss.com/docs/plugins

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    'app.vue'
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
