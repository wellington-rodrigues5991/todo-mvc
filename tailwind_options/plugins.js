const plugin = require('tailwindcss/plugin')

module.exports = {
  variants: {
    backgroundImage:  ({ after }) => after(['label-checked']),
    textDecoration:  ({ after }) => after(['label-checked']),
    textColor:  ({ after }) => after(['label-checked']),
    boxShadow:  ({ after }) => after(['checked', 'before']),
    position:  ({ after }) => after(['before']),
    width:  ({ after }) => after(['before']),
    height:  ({ after }) => after(['before']),
    overflow:  ({ after }) => after(['before']),
    inset:  ({ after }) => after(['before']),
    opacity:  ({ after }) => after(['group-hover']),
    outline:  ({ after }) => after(['focus']),
    maxWidth:  ({ after }) => after(['responsive'])
  },
  plugins: [
    plugin(function({ addVariant, e }) {
      addVariant('label-checked', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`label-checked${separator}${className}`)}:checked + label`
        })
      })
    }),
    plugin(function({ addVariant, e }) {
      addVariant('before', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`before${separator}${className}`)}:before`
        })
      })
    }),
    function ({ addUtilities }) {
      addUtilities(
        {
          '.empty-content': {
            content: "''"
          }
        },
        ['before']
      )
    }
  ]
}