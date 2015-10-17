window.app = (function () {
  function chatWindow (settings) {
    function draw (selection) {
      log(window.chatlog.recentHistory())
      var messages = selection.selectAll('div.message')
        .data(window.chatlog.recentHistory(), function (d) { return d.id })
      messages
        .classed('message', true)
        .text(function (d) { return d.content })
      messages.enter().append('div')
        .classed('message', true)
        .text(function (d) { return d.content })
      messages.exit()
        .remove()
    }

    return draw
  }

  function chatBox (settings) {
    function draw (selection) {
    }

    return draw
  }

  function app (settings) {
    function draw (selection) {
      selection.append('h1')
        .text('Chatroom')
      selection.append('div')
        .classed('chatWindow', true)
        .call(chatWindow())
      selection.append('div')
        .classed('chatBox', true)
        .call(chatBox())

      ;(function update (selection) {
        var messages = selection.selectAll('div.message')
          .data(window.chatlog.recentHistory(), function (d) { return d.id })
        messages
          .classed('message', true)
          .text(function (d) { return d.content })
        messages.enter().append('div')
          .classed('message', true)
          .text(function (d) { return d.content })
        messages.exit()
          .remove()
        chatlog.on('update.app', update.bind(null, selection))
      })(selection)
    }
    return draw
  }

  d3.select('#app')
    .call(app())
})()

