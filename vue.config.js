let publicPath = "/";

const IsMui = process.env.VUE_APP_BUILD === "mui";

if (IsMui) {
  publicPath = './';
} else if (process.env.NODE_ENV === "production") {
  publicPath = '//www.mycdn.com/website1/';
}

module.exports = {
  publicPath: publicPath,
  assetsDir: "static",
  productionSourceMap: false,
  runtimeCompiler: true,
  filenameHashing: !IsMui,
  pages: {
    index: {
      entry: "src/main.js"
    }
  },
  devServer: {
    proxy: require("./config/proxy.js")
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