module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ?
    '//www.mycdn.com/website1/' : '/',
  assetsDir: 'static',
  productionSourceMap: false,
  runtimeCompiler: true,
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
      'jquery': "jQuery",
      'moment': 'moment',
      'rxjs': 'Rx',
      'lodash': '_',
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'element-ui': 'ELEMENT',
      'axios': 'axios',
      'xlsx': 'XLSX',
    })
  }
}