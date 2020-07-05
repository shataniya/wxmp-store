const initState = require('./state')
// reducer
function message (state = initState.message, action) {
  switch (action.type) {
    case 'MESSAGE_CHANGE':
      state = action.data
      return state
    default:
      return state
  }
}

function num (state = initState.num, action) {
  switch (action.type) {
    case 'NUM_ADD':
      state = state + 1
      return state
    case 'NUM_REDUCE':
      state = state - 1
      return state
    default:
      return state
  }
}

function list (state = initState.list, action) {
  switch (action.type) {
    case 'PUSH':
      state.push(action.data)
      return state
    case 'POP':
      state.pop()
      return state
    default:
      return state
  }
}

module.exports = {
  message,
  num,
  list
}
