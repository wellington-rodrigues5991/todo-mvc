const withCSS = require("@zeit/next-css");
const withBabelMinify = require('next-babel-minify')();

module.exports = withBabelMinify()
module.exports = withCSS();