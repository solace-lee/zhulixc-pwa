module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      },
      postcss: {
        plugins: [
          require('postcss-px2rem')({ remUnit: 10, baseDpr: 2 })// 换算的基数
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: false
    }
  }
}
