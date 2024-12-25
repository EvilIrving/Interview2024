// Code Splitting: SplitChunksPlugin - minChunks
/**
 * minChunks: 最少引用次数
 * minSize: 最小尺寸
 * maxInitialRequests: 最大初始请求数
 * maxAsyncRequests: 最大异步请求数
 * automaticNameDelimiter: 自动命名分隔符
 * automaticNameMaxLength: 自动命名最大长度
 * chunks: 选择哪些块进行优化
 * cacheGroups: 缓存组
 */
const { min } = require("lodash");
const path = require("path");

const config = {
  mode: "development",
  // publicPath: "/dist/",
  entry: {
    entry1: "./src/entry-a.js",
    entry2: "./src/entry-b.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 1, //  * 1024 * 1024,
      minChunks: 2,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
      // minSize: 0,
    },
    // runtimeChunk: true,
  },
};

module.exports = config;
