window.chatlog = (function () {
  var store = {
    history: []
  }
  var dispatch = d3.dispatch('update')
  d3.rebind(store, dispatch, 'on')

  store.update = function (action) {
    log(action)
    if (action.type === 'addMessage') {
      var message = action.payload
      message.id = store.history.length
      store.history = store.history.concat(message)
    }
    dispatch.update()
  }

  store.fullHistory = function () {
    return store.history
  }

  store.recentHistory = function (n) {
    if (n === undefined) { n = 10 }
    return store.history.slice(-n)
  }

  dispatcher.on('action.chatlog', store.update)
  return store
})()
