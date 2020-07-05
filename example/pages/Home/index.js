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
  onMessageInput (evt) {
    const action = {
      type: 'MESSAGE_CHANGE',
      data: evt.detail.value
    }
    // 触发message数据的更新
    store.dispatch(action)
  }
})