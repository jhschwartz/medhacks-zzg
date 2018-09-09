var token = ''
var headset_id = ''

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
const ID_CREATE_SESSION = 5
const ID_QUERY_SESSIONS = 6
const ID_SUBSCRIBE = 7
const ID_OTHER = 999

// TODO: begin when website says so, not on load
var run_socket = (socket, streams) => {
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

  // // connect socket
  // var socket = new WebSocket('wss://emotivcortex.com:54321')

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
        headset_id = data['result'][0]['id']
        console.log(headset_id)
        create_session(headset_id)
        break
      case ID_CREATE_SESSION:
        console.log('received create session')
        console.log(data)
        query_sessions()
        break
      case ID_QUERY_SESSIONS:
        console.log('received query session')
        console.log(data)
        subscribe()
        break
      case ID_SUBSCRIBE:
        console.log('received subscribe')
        console.log(data)
        handle_message(data)
        break
      case ID_OTHER:
        console.log('received other')
        handle_message(data)
        break
      default:
        // default no id so we are collecting data
        process_data(data)
    }
  }

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
        'username': username,
        'password': password,
        'client_id': client_id,
        'client_secret': client_secret
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

  function create_session(headset_id) {
    socket.send(JSON.stringify({
      'jsonrpc': '2.0',
      'method': 'createSession',
      'id': ID_CREATE_SESSION,
      'params': {
        '_auth': token,
        'headset': headset_id,
        'status': 'open'
      }
    }))
  }

  function query_sessions() {
    socket.send(JSON.stringify({
      'jsonrpc': '2.0',
      'method': 'querySessions',
      'id': ID_QUERY_SESSIONS,
      'params': {
        '_auth': token
      }
    }))
  }

  function subscribe() {
    socket.send(JSON.stringify({
      'jsonrpc': '2.0',
      'method': 'subscribe',
      'id': ID_SUBSCRIBE,
      'params': {
        '_auth': token,
        'streams': streams
      }
    }))
  }

  var handle_message = data => {
    console.log(data)
  }

  var process_data = data => {
    pow = data['pow']
    met = data['met']
    mot = data['mot']

    // pow: band data
    // using this to interpret sleep
    // needs to be stored in sets for analysis
    pow_data.push(pow)
    update_pow(pow)

    // met: health metrics (stress, excitement, etc)
    // using this to associate with sleep
    // needs to be stored in sets for analysis
    met_data.push(met)
    update_met(met)

    // mot: motion data
    // using this to look pretty/stand in for our lack of real-time eeg
    // needs to trigger an update event all the time
    update_mot(mot)
  }

  socket.onclose = function(event) {
    console.log('socket closed!')
  }
}
