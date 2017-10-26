module.exports = {
  entry: ['babel-polyfill', './client/index.js'],
  output: {
    filename: './.build/bundle.js'
  },
  module: {
    loaders : [
        {
          test : /\.js?/,
          loader : 'babel-loader'
        }
    ]
  }
};