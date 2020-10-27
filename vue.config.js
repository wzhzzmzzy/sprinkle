const port = process.env.VUE_APP_PAGE_PORT || 9875;

module.exports = {
  publicPath: '/',
  lintOnSave: false,
  devServer: {
    port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/mock': {
        target: 'http://127.0.0.1:9876'
      }
    }
  },
  configureWebpack: {
    module: {
      rules: [{
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      }]
    }
  }
};
