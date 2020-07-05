# wxmp-store
微信小程序的简易store，实现页面和页面之间，组件和页面之间数据的共享
# 原理
整个小程序store的实现【具体可以看Store.js源代码】
# example
example项目就是一个应用例子，可以使用微信开发者平台打开项目，可以感受一下store的魅力
# store的构建
使用的时候一般会分为4个步骤：（可以看下example项目里的store文件夹，参考一下目录结构）
【1】创建state.js，这里会存储你想要共享的数据的初始值

【2】创建reducer，类似于redux里的reducer概念，决定你更新数据的逻辑，例如：
```javascript
// reducer.js
// 创建一个共享数据num，实际上每一个共享的数据就是一个reducer
const initState = require('./state.js')
function num (state = initState.num, action) {
  switch (action.type) {
    // 触发 NUM_ADD 方法的时候会更新num，让num加1
    case 'NUM_ADD':
      state = state + 1
      return state
    // 触发 NUM_REDUCE 方法的时候会更新num，让num减1
    case 'NUM_REDUCE':
      state = state - 1
      return state
    default:
      return state
  }
}

// 导出reducer的时候要以对象的形式导出
module.exports = {
  num
}
```
【3】创建index.js，创建store，这个store管理整个项目所有共享的数据
```javascript
const reducers = require('./reducer.js')
// 对于Store.js，建议直接把Store.js整个文件复制过去
const Store = require('./Store.js)

// 创建store的实例
const store = new Store(reducers)

// 导出store实例，这样可以在每个页面或组件都可以直接调用
module.exports = store
```
【1】【2】【3】完成之后基本上这个项目的store就已经构建好了。
# store的使用
基本上store的使用可以归结为两个方法：store.map 和 store.dispatch
# store.map
store.map 的作用就是将页面或组件里的属性和store里面的数据关联起来
