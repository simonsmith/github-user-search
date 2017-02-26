const atImport = require('postcss-import');
const customProperties = require('postcss-custom-properties');
const customMedia = require('postcss-custom-media');
const autoPrefixer = require('autoprefixer');
const {viewport} = require('../src/theme');

function extractMediaQuery(str) {
  return str.match(/\(.+\)/)[0];
}

module.exports = {
  loader: 'postcss-loader',
  options: {
    plugins() {
      return [
        atImport,
        customProperties,
        customMedia({
          extensions: {
            '--sm-viewport': extractMediaQuery(viewport.SM),
          },
        }),
        autoPrefixer,
      ];
    },
  },
};
