// 示例1: 基础配置

const path = require("path");
const config = {
  mode: "development",
  entry: {
    entry: "./src/main.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    splitChunks: {
      // 初始加载时最多只允许3个请求
      maxInitialRequests: 2,
      // 异步加载时最多允许5个请求
      maxAsyncRequests: 5,
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
