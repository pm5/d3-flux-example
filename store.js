window.chatlog = (function () {
  var store = {
    _hist: [],
    _ct: 0
  }
  var dispatch = d3.dispatch('update')
  d3.rebind(store, dispatch, 'on')

  store.update = function (action) {
    log(action)
    if (action.type === 'addMessage') {
      var message = action.payload
      message.id = Date.now()
      store._hist = store._hist.concat(message)
      store._ct = store._hist.length
    }
    dispatch.update()
  }

  store.fullHistory = function () {
    return store._hist
  }

  store.recentHistory = function (n) {
    if (n === undefined) { n = 10 }
    return store._hist.slice(-n)
  }

  store.count = function () {
    return store._ct
  }

  dispatcher.on('action.chatlog', store.update)
  return store
})()
