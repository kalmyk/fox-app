import * as Actions from '../routes/chat/actions';

var autobahn = require('autobahn');

let connection = new autobahn.Connection({
//  url: 'ws:'+window.location.host+'/wss',
  url: 'ws:localhost:9000',
  realm: 'realm1'
});

let session = null;
let crp = null;

export function getMessages(callback) {
  session.call('chat.getMessages').then(
     function (messages) {
       callback(messages.args);
     },
     function (error) {
        console.log("Call failed:", error);
     });
};

export function postMessage(message, callback) {
  let timestamp = Date.now();
  let id = 'm_' + timestamp;
  let threadID = message.threadID;

  let createdMessage = {
    id,
    threadID,
    threadName: message.threadName,
    authorName: message.authorName,
    text: message.text,
    timestamp
  };

  session.call('chat.postMessage', [], {message:createdMessage}).then(
     function (message) {
       callback(message);
     },
     function (error) {
        console.log("Call failed:", error);
     });
};

function onEvent(publishArgs, kwargs, opts) {
//   console.log('Event', opts.topic, 'received args', publishArgs, 'kwargs ',kwargs);
   Actions.messageArrived(kwargs.message);
}

connection.onopen = function (newSession, details) {
  session = newSession;
  crp(null);
  console.log('Connected');

  session.subscribe('chat.messages', onEvent).then(
      function(subscription) {
         console.log("subscription successfull", subscription.topic);
      },
      function(error) {
         console.log("subscription failed", error);
      }
   );
}

let openConnection = function () {
  return new Promise((resolve, reject) => {
    crp = resolve;
    connection.open();
  });
};

openConnection().then(
  (result) => { Actions.loadRawMessages(); }
);

