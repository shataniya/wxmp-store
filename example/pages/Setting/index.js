const store = require('../../store/index')

Page({
  data: {
    message: "",
    num: 0
  },
  onLoad () {
    // 将页面数据message和store里的数据message关联起来
    store.map(this, 'message')
    // 将页面数据num和store里的数据num关联起来
    store.map(this, 'num')
  },
  // 点击+1按钮会导致num+1
  onAdd () {
    const action = {
      type: 'NUM_ADD',
      data: this.data.num + 1
    }
    store.dispatch(action)
  },
  // 点击-1按钮会导致num-1
  onReduce () {
    const action = {
      type: 'NUM_REDUCE',
      data: this.data.num - 1
    }
    store.dispatch(action)
  }
})