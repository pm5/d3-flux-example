window.app = (function () {
  function chatWindow (settings) {
    function draw (selection) {
      var messages = selection.selectAll('div.message')
        .data(settings.messages, function (d) { return d.id })
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
      var messageBox = selection.selectAll('textarea.messageBox')
        .data([''])
        .text(function (d) { return d })
      messageBox.enter().append('textarea')
        .classed('messageBox', true)
        .text(function (d) { return d })

      var buttons = selection.selectAll('button')
        .data([
          { label: 'Submit', classNames: 'submit', onClick: handleSubmit }
        ])
      buttons.enter().append('button')
        .attr('class', function (d) { return d.classNames })
        .text(function (d) { return d.label })
        .on('click', function (d) { return d.onClick() })

      function handleSubmit () {
        window.dispatcher.action({
          type: 'addMessage',
          payload: {
            content: messageBox[0][0].value
          }
        })
      }
    }
    return draw
  }

  function app (settings) {
    function draw (selection) {
      selection.append('h1')
        .text('Chatroom')
      var chatWindowContainer = selection.append('div')
        .classed('chatWindow', true)
      var chatBoxContainer = selection.append('div')
        .classed('chatBox', true)

      ;(function update (selection) {
        chatWindowContainer.call(chatWindow({
          messages: window.chatlog.recentHistory()
        }))
        chatBoxContainer.call(chatBox())
        chatlog.on('update.app', update.bind(null, selection))
      })(selection)
    }
    return draw
  }

  d3.select('#app')
    .call(app())
})()
