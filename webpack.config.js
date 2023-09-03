const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  externals: {
    "@napi-rs/snappy-win32-x64-msvc": "commonjs @napi-rs/snappy-win32-x64-msvc"
  },
  module: {
    rules: [
      {
        test: /.node$/,
        use: "node-loader"
      }
    ]
  }
};
