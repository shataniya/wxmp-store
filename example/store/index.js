const reducers = require('./reducers')
const Store = require('./Store')

const store = new Store(reducers)

module.exports = store
