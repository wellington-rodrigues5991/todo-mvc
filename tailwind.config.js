const plugin = require('tailwindcss/plugin')
const plugins = require('./tailwind_options/plugins')
const theme = require('./tailwind_options/theme');

module.exports = {
  purge: [],
  theme,
  ... plugins
}
