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

export function subscribe(uri, kwargs, args) {
  return session.subscribe(uri, kwargs, args);
}

connection.onopen = function (newSession, details) {
  session = newSession;
  crp(null);
  console.log('Connected');
}

export let openConnection = function () {
  return new Promise((resolve, reject) => {
    crp = resolve;
    connection.open();
  });
};
