window.app = (function () {
  // cf React (stateless) component
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

  function chatCount (settings) {
    function draw (selection) {
      var count = selection.selectAll('div')
        .data([settings.count])
        .text(function (d) { return 'Total ' + d + ' messages' })
      count.enter().append('div')
        .text(function (d) { return 'Total ' + d + ' messages' })
    }
    return draw
  }

  // D3.js is not very good at making control UI...
  // The keypoint here is to use dispatcher to manipulate data.
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

  // cf React data container
  function app (settings) {
    function draw (selection) {
      selection.append('h1')
        .text('Chatroom')
      selection.append('h2')
        .text('Latest 5 messages')
      var chatCountContainer = selection.append('div')
        .classed('chatCount', true)
      var chatWindowContainer = selection.append('div')
        .classed('chatWindow', true)
      var chatBoxContainer = selection.append('div')
        .classed('chatBox', true)

      ;(function update (selection) {
        chatCountContainer.call(chatCount({
          count: window.chatlog.count()
        }))
        chatWindowContainer.call(chatWindow({
          messages: window.chatlog.recentHistory(5)
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
