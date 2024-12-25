// entry-a.js
import("./async-module.js");
import common from "./common.js";
import after from "./after.js";
import _ from "lodash";

console.log(common);
let a = after;

function logA() {
  console.log(a);
}

logA();
console.log(_.isArray("123"));
