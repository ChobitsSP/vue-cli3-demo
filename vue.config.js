module.exports = {
  assetsDir: 'static',
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'src/main.js',
    }
  },
  devServer: {
    proxy: require('./config/proxy.js')
  },
  chainWebpack: config => {
    config.externals({
      'moment': 'moment',
      'rxjs': 'Rx',
      'lodash': '_',
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'element-ui': 'ELEMENT',
      'axios': 'axios',
    })
  }
}