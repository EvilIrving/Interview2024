const path = require("path");

const config = {
  mode: "development",
  entry: {
    entry: "./src/main.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    splitChunks: {
      maxInitialRequests: 3,
      maxAsyncRequests: 2, // 限制更严格
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: -10,
        },
        default: {
          minSize: 0,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};

module.exports = config;
