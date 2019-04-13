module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
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
      theme: true
    }
  },

  pwa: {
    name: '助力乡村',
    themeColor: '#00ae87'
  },

  devServer: {
    proxy: {
      'http://192.168.1.107:9100': {
        target: 'http://47.112.2.242:91001',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
