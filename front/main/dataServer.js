let autobahn = require('autobahn')
let wsuri

if (document.location.host === 'localhost') {
  wsuri = 'ws://127.0.0.1:9000'
} else {
  wsuri = (document.location.protocol === 'http:' ? 'ws://' : 'wss://') + window.location.host + '/wamp'
}

let connection = new autobahn.Connection({
  url: wsuri,
  realm: 'realm1'
})

let session = null
let crp = null

export function call (uri, kwargs, args) {
  return session.call(uri, kwargs, args)
}

export function publish (uri, kwargs, args, opts) {
  return session.publish(uri, kwargs, args, opts)
}

export function subscribe (uri, onEvent, opts) {
  return session.subscribe(uri, onEvent, opts)
}

export function unsubscribe (subscription) {
  return session.unsubscribe(subscription)
}

connection.onopen = function (newSession, details) {
  session = newSession
  crp(null)
  console.log('Connected')
}

export function openConnection () {
  return new Promise((resolve, reject) => {
    crp = resolve
    connection.open()
  })
}
