module.exports = {
  lintOnSave: false,
  configureWebpack: {
    module: {
      rules: [{
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      }]
    }
  }
}
