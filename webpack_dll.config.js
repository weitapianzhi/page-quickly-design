const webpack = require("webpack")
const path = require("path")
module.exports = {
  entry: {
    vendor: [ 'vue/dist/vue.esm.js', 'vue', 'vuex', 'vue-router' ]
  },
  output: {
    filename: "_dll_[name].js",
    path: path.join(__dirname, "./dist/dll"),
    library: "_dll_[name]"
  },
  plugins: [
    new webpack.DllPlugin({
      name: "_dll_[name]",
      path: path.join(__dirname,"./dist/dll/vendor.manifest.json")
    })
  ]
}