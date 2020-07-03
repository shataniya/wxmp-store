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

module.exports = {
  message,
  num
}
