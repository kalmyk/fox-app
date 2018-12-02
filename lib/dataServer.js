var autobahn = require('autobahn');

let connection = new autobahn.Connection({
//  url: 'ws:'+window.location.host+'/wss',
  url: 'ws:localhost:9000',
  realm: 'realm1'
});

let session = null;
let crp = null;

export function call(uri, kwargs, args) {
  return session.call(uri, kwargs, args);
}

export function subscribe(uri, onEvent, opts) {
  return session.subscribe(uri, onEvent, opts);
}

export function unsubscribe(subscription) {
  return session.unsubscribe(subscription);
}

connection.onopen = function (newSession, details) {
  session = newSession;
  crp(null);
  console.log('Connected');
}

export function openConnection() {
  return new Promise((resolve, reject) => {
    crp = resolve;
    connection.open();
  });
}
