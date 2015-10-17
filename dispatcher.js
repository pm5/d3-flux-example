window.dispatcher = (function () {
  var dispatcher = {}
  var dispatch = d3.dispatch('action')
  d3.rebind(dispatcher, dispatch, 'on')

  dispatcher.action = function (action) {
    dispatch.action(action)
  }

  dispatcher.waitFor = function () {
    // unimplemented
  }

  return dispatcher
})()
