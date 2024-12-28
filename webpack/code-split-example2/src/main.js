// 示例代码结构:
// entry.js
import "./moduleA"; // 初始加载
import("./moduleB")
  .then(
    () =>
      // 异步加载
      import("./moduleC") // 异步加载
  )
  .then(
    () => import("./moduleD") // 异步加载
  );

import _ from "lodash";

function main() {
  console.log("main");

  _.isArray("123");
}

main();