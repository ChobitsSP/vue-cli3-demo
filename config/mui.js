module.exports = {
  publicPath: "",
  assetsDir: "static",
  productionSourceMap: false,
  runtimeCompiler: true,
  filenameHashing: false,
  pages: {
    index: {
      entry: "src/main.js"
    }
  },
  chainWebpack: config => {
    config.externals({
      jquery: "jQuery",
      moment: "moment",
      rxjs: "Rx",
      lodash: "_",
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      "element-ui": "ELEMENT",
      axios: "axios",
      xlsx: "XLSX"
    });
  }
};