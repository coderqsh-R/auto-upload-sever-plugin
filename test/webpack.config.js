const HtmlWebpackPlugin = require("html-webpack-plugin")

const AutoUploadSeverPlugin = require("auto-upload-sever-plugin")

/**
 * @type {import("webpack").Configuration}
 */
const config = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new AutoUploadSeverPlugin({
      host: "119.91.42.105",
      username: "root",
      password: "QUshihang123",
      remotePath: "/usr/share/nginx/html/webpack"
    })
  ]
}

module.exports = config
