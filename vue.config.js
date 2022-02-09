module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import '@/assets/scss/variables/index.scss';
          @import '@/assets/scss/mixins/index.scss';
        `
      }
    }
  },
  devServer: {
    proxy: {
      '/lk-api/login': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: { '/lk-api/signup': '/api/v1/auth/login' }
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
