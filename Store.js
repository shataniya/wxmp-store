// store
// 创建一个Store类
function Store (reducers) {
  if (!(this instanceof Store)) {
    return new Store(reducers)
  }
  this.reducers = reducers
  // 初始化state数据
  this.initState()
  // 初始化事件
  this.initEvents()
}
// 初始化state数据
Store.prototype.initState = function () {
  // 在初始化state数据的时候，设置action默认为initAction
  const initAction = { type: '' }
  this.state = {}
  for (const attr in this.reducers) {
    this.state[attr] = this.reducers[attr](undefined, initAction)
  }
}
// 初始化数据更新触发的事件
Store.prototype.initEvents = function () {
  this.events = {}
}
// 获取最新的state数据
Store.prototype.getState = function () {
  return this.state
}
// 更新state数据
Store.prototype.dispatch = function (action) {
  for (const attr in this.reducers) {
    // 获取之前的数据
    const oldState = this.state[attr]
    // 获取最新的数据
    const newState = this.reducers[attr](oldState, action)
    if (oldState !== newState) {
      // 说明数据发生了更新
      this.state[attr] = newState // 更新数据
      // 触发数据更新之后的事件
      this.emit(attr, newState)
    }
  }
}
// 监听指定state数据的更新
Store.prototype.on = function (attr, update) {
  if (!this.events[attr]) {
    this.events[attr] = [update]
  } else {
    this.events[attr].push(update)
  }
}
// 数据更新发布事件
Store.prototype.emit = function (attr, data) {
  if (!this.events[attr]) return
  for (let i = 0; i < this.events[attr].length; i++) {
    this.events[attr][i](data)
  }
}
// 将微信小程序里的属性和state数据绑定起来
Store.prototype.map = function (vm, wxmpAttr, attr) {
  if (vm.data[wxmpAttr] == null) {
    throw new Error(wxmpAttr + '属性不存在')
  }
  if (!attr) {
    // 说明页面或者组件的属性和state数据名称相同
    attr = wxmpAttr
    this.map(vm, wxmpAttr, attr)
    return
  }
  // 初始化数据
  // console.log(this.getState()[attr])
  vm.setData({
    [wxmpAttr]: this.getState()[attr]
  })
  // 监听数据
  this.on(attr, (data) => {
    vm.setData({
      [wxmpAttr]: data
    })
  })
}

module.exports = Store
