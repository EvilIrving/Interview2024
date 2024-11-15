# Interview2024

## JavaScript 核心知识点解析

### 1. Symbol.hasInstance 重写 instanceof

```js
class PrimitiveString {
  static [Symbol.hasInstance](x) {
    return typeof x === "string";
  }
}
console.log("hello" instanceof PrimitiveString); // true
```

- Symbol.hasInstance 用于自定义 instanceof 行为
- 可以控制任何值与类的 instanceof 检查结果

### 2. 对象类型转换优先级

```js
const obj = {
  valueOf() { return 333 },
  toString() { return "string" },
  [Symbol.toPrimitive](hint) {
    return hint === "string" ? "str" : 42;
  }
};
```

转换优先级：

1. Symbol.toPrimitive
2. valueOf()
3. toString()

### 3. 四则运算转换规则

```js
// 规则1: + 号两边有字符串，执行字符串拼接
1 + "1" // "11"

// 规则2: + 号两边是数字或布尔值，执行加法运算
true + true // 2

// 规则3: 数组会先toString()再运算
4 + [1,2,3] // "41,2,3"

// 规则4: 一元+操作符会将操作数转为数字
"a" + +"b" // "aNaN"
```

### 4. 函数绑定与this指向

```js
// bind只能生效一次，后续bind无效
fn.bind().bind(a)(); // window/global

// bind返回新函数，this指向最后调用环境
function fn() { console.log(this) }
fn.bind(obj)(); // obj
```

### 5. 隐式转换

```js
[] == ![] // true
// 转换步骤:
// 1. ![] -> false
// 2. [] -> 0
// 3. 0 == false -> true

if ([]) { // true，因为[]是对象，转布尔值为true
  console.log("truthy");
}
```

我会按照要求整理这些涉及的JavaScript核心知识点。

### 1. 闭包与变量作用域

```js
// 方法1: IIFE(立即执行函数)创建闭包
for (var i = 1; i <= 5; i++) {
  (function(j) {
    setTimeout(() => console.log(j), j * 1000);
  })(i);
}

// 方法2: setTimeout第三个参数
for (var i = 1; i <= 5; i++) {
  setTimeout((j) => console.log(j), i * 1000, i);
}

// 方法3: let块级作用域
for (let i = 1; i <= 5; i++) {
  setTimeout(() => console.log(i), i * 1000);
}
```

- 闭包: 内部函数可访问外部函数的变量
- let 创建块级作用域，每次循环都是新的变量

### 2. JSON序列化的局限性

```js
const obj = {
  age: undefined,
  sex: Symbol("male"),
  jobs: function() {},
  name: "yck"
};
JSON.parse(JSON.stringify(obj)); // {name: "yck"}
```

JSON.stringify 无法处理:

- undefined
- Symbol
- 函数
- 循环引用对象

### 3. 数据类型转换

```js
String(undefined) // "undefined"
String(null) // "null"
String(Symbol()) // "Symbol()"
```

- 基本类型都可以通过String()转为字符串
- 对象类型会调用toString()方法

### 4. JavaScript原型链

```js
// Object是所有对象的原型
obj.__proto__ === Object.prototype

// Function是所有函数的原型
func.__proto__ === Function.prototype

// 原型链查找
object.__proto__.__proto__...
```

核心概念:

- `__proto__`: 对象的原型指针
- prototype: 函数的原型对象
- 原型链: 通过__proto__连接

### 1. 变量与作用域

#### 1.1 全局作用域与window对象

- let/const声明的变量不会挂载到window对象上，这与var不同

```javascript
var a = 1;  // window.a === 1
let b = 2;  // window.b === undefined
```

#### 1.2 模块化

- CommonJS与ES Module的重要区别：

```javascript
// CommonJS - 值拷贝
let counter = 3;
module.exports = {
    counter
}
// 修改counter不会影响已导入的值

// ES Module - 实时绑定
export let counter = 3;
// 修改counter会实时反映到导入处
```

### 2. 数组方法

#### 2.1 reduce方法

- 用于数组累加计算，接收累加器和当前值

```javascript
const arr = [1, 2, 3];
const sum = arr.reduce((acc, current) => acc + current, 0);
// acc: 累加器
// current: 当前值
// 0: 初始值
```

### 3. 生成器(Generator)

#### 3.1 Generator函数特性

- 函数体内部可暂停和恢复执行
- yield表达式可暂停执行并返回值

```javascript
function* foo(x) {
    let y = 2 * (yield x + 1);    // 第一次yield
    let z = yield y / 3;          // 第二次yield
    return x + y + z;             // 最终返回
}
let it = foo(5);
it.next();     // {value: 6, done: false}   - 第一次yield返回
it.next(12);   // {value: 8, done: false}   - 第二次yield返回
it.next(13);   // {value: 42, done: true}   - 生成器结束
```

### 4. 异步编程

#### 4.1 Promise状态

- pending: 初始状态
- resolved: 成功状态
- rejected: 失败状态

```javascript
new Promise((resolve, reject) => {
    // 构造函数内代码立即执行
    resolve(value);  // 成功
    reject(error);   // 失败
});
```

#### 4.2 async/await

- async函数返回Promise
- await暂停执行等待Promise完成

```javascript
let a = 0;
let b = async () => {
    a = a + (await 10); // await 操作会创建一个 generator，保存当时的执行上下文 a = 0 被保存了下来
    console.log("2", a);  // 10 - await后执行
};
b();
a++;
console.log("1", a);  // 1 - 同步代码先执行
```

### 5. 并发与并行

- 并发(Concurrency): 多个任务交替执行
- 并行(Parallelism): 多个任务同时执行

```javascript
// 并发示例 - 使用异步操作
async function concurrent() {
    const task1 = doTask1();
    const task2 = doTask2();
    await Promise.all([task1, task2]);
}

// 并行示例 - Web Worker
const worker = new Worker('worker.js');
```

## 1. Event Loop 执行顺序

Event Loop 分为两类任务：微任务（jobs）和宏任务（tasks）。

### 1.1 微任务（Jobs）

微任务包括：

- `process.nextTick`
- `Promise` 的 `.then` 或 `.catch`
- `MutationObserver`

### 1.2 宏任务（Tasks）

宏任务包括：

- 脚本执行（script）
- `setTimeout`
- `setInterval`
- `setImmediate`
- I/O 操作
- UI 渲染

## 2. Node Event Loop vs 浏览器 Event Loop

Node.js 和浏览器的 Event Loop 在处理异步操作方面有一些不同之处。

### 2.1 主要区别

- **执行环境**：Node.js 是基于事件驱动的服务器环境，而浏览器则是客户端环境。
- **任务队列**：Node.js 的 Event Loop 还包括 `libuv` 提供的线程池，处理文件系统、网络等 I/O 操作。

## 3. 浮点数精度问题

JavaScript 的浮点数运算存在精度问题，例如：

```javascript
console.log(0.1 + 0.2 === 0.3); // false
console.log(parseFloat((0.1 + 0.2).toFixed(10)) === 0.3); // true
```

浮点数运算采用 IEEE 754 标准，导致 0.1 + 0.2 不等于 0.3 的结果。使用 `toFixed` 方法可以限制小数位数，从而避免精度问题。

## 4. 简单请求与复杂请求

### 4.1 简单请求

简单请求满足以下条件：

- 方法为 `GET`、`POST`、`HEAD`
- 请求头不超过 7 个，且不含 `Content-Type` 为 `application/json`、`text/xml`、`application/x-www-form-urlencoded` 以外的类型。

### 4.2 复杂请求

复杂请求指任何不符合简单请求条件的请求，通常需要进行 CORS 预检请求（OPTIONS）。

### 4.3 示例

```javascript
// 简单请求示例
fetch("https://api.example.com/data", {
  method: "GET"
});

// 复杂请求示例
fetch("https://api.example.com/data", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ key: "value" })
});
```

## 浏览器缓存机制

## 浏览器渲染机制

## 安全（CSRF、XSS、CORS、CSP）

