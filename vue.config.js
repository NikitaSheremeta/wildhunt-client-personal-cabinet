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
  }
};
