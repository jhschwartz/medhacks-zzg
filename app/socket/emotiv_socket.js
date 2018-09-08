var token = ''

window.onload = function() {

  // Get references to elements on the page.
  var form = document.getElementById('message-form')
  var messageField = document.getElementById('message')
  var messagesList = document.getElementById('messages')
  var socketStatus = document.getElementById('status')
  var closeBtn = document.getElementById('close')

  // Create a new WebSocket.
  const ID_GET_USER_LOGIN = 1
  const ID_AUTHORIZE = 2
  const ID_LICENSE_ACCEPT = 3
  const ID_QUERY_HEADSETS = 4
  const ID_OTHER = 999

  // Thanks SO user user3215378: https://stackoverflow.com/a/21394730/4176019
  function waitForSocketConnection(socket, callback) {
    setTimeout(
      function () {
          if (socket.readyState === 1) {
              console.log("Connection is made")
              if(callback != null){
                  callback()
              }
              return

          } else {
              console.log("wait for connection...")
              waitForSocketConnection(socket, callback)
          }

      }, 5) // wait 5 milisecond for the connection...
  }

  // connect socket
  var socket = new WebSocket('wss://emotivcortex.com:54321')

  // send user login
  waitForSocketConnection(socket, function() {
    socket.send(JSON.stringify({
      'jsonrpc': '2.0',
      'method': 'getUserLogin',
      'id': ID_GET_USER_LOGIN
    }))
  })

  function authorize() {
    socket.send(JSON.stringify({
      'jsonrpc': '2.0',
      'method': 'authorize',
      'id': ID_AUTHORIZE,
      'params': {
        'username': 'medhacks',
        'password': 'betterThanHophacks',
        'client_id': 'f9joicKJ1goieO06smlnTb3sBZq7MryqzWWO3Xq8',
        'client_secret': 'Yzu2HfH72EvkvN6ojB6wAftSNpp9lqiICsRyS6x2o1YMJEv2VFnF2yfjr6y1hWmMBUfnkojdP1QOWR4ClMcaMxfNxNTFd5rW6cGRBDFf8BkXczvDZvRDQezaNnS9OuyD'
      }
    }))
  }

  function license(token) {
    console.log(token)
    socket.send(JSON.stringify({
      'jsonrpc': '2.0',
      'method': 'acceptLicense',
      'id': ID_LICENSE_ACCEPT,
      'params': {
        '_auth': token
      }
    }))
  }

  function query_headsets() {
    socket.send(JSON.stringify({
      'jsonrpc': '2.0',
      'method': 'queryHeadsets',
      'id': ID_QUERY_HEADSETS,
      'params': {
        'wilcard': 'EPOCPLUS-*'
      }
    }))
  }

  var handle_message = data => {
    // something
    console.log(data)
  }

  socket.onmessage = function(event) {
    var data = JSON.parse(event.data)

    switch (data['id']) {
      case ID_GET_USER_LOGIN:
        console.log('received user login')
        console.log(data)
        authorize()
        break
      case ID_AUTHORIZE:
        console.log('received authorize')
        console.log(data)
        token = data['result']['_auth']
        license(token)
        break
      case ID_LICENSE_ACCEPT:
        console.log('received license')
        console.log(data)
        query_headsets()
        break
      case ID_QUERY_HEADSETS:
        console.log('received query headsets')
        console.log(data)
        handle_message(data)
        break
      case ID_OTHER:
        console.log('received other')
        console.log(data)
        handle_message(data)
        break
      default:
        throw Error('Unexpected message ID')
    }
  }
  

}