const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[file].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import '@/assets/scss/variables/index.scss';
          @import '@/assets/scss/mixins/index.scss';
        `
      }
    }
  },
  devServer: {
    proxy: {
      '/lk-api/refresh': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: { '/lk-api/refresh': '/api/v1/auth/refresh' }
      },
      '/lk-api/login': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: { '/lk-api/login': '/api/v1/auth/login' }
      },
      '/lk-api/signup': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: { '/lk-api/signup': '/api/v1/auth/signup' }
      },
      '/lk-api/logout': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: { '/lk-api/signup': '/api/v1/auth/logout' }
      },
      '/lk-api/forgot-password': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: {
          '/lk-api/forgot-password': '/api/v1/auth/forgot-password'
        }
      }
    }
  }
};
