import Reflux from 'reflux';
import * as ChatMessageUtils from './ChatMessageUtils';
import * as dataServer from '../dataServer';

export let loadRawMessages = Reflux.createAction({
  asyncResult: true
});

export let loadingStarted = Reflux.createAction();

export let loadingFinished = Reflux.createAction();

export let clickThread = Reflux.createAction();

export let messageArrived = Reflux.createAction();

export let createMessage = Reflux.createAction({
  asyncResult: true
});

function onEvent(publishArgs, kwargs, opts) {
//   console.log('Event', opts.topic, 'received args', publishArgs, 'kwargs ', kwargs);
   messageArrived(kwargs.message);
}

loadRawMessages.listen(function () {
  console.log('loadRawMessages');

  dataServer.subscribe('chat.messages', onEvent).then(
      function(subscription) {
         console.log("subscription successfull", subscription.topic);
      },
      function(error) {
         console.log("subscription failed", error);
      }
   );

  dataServer.call('chat.getMessages').then(
     function (messages) {
       loadRawMessages.completed(messages.args);
     },
     function (error) {
        console.log("Call failed:", error);
     });
});

function postMessage(message, callback) {
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

  dataServer.call('chat.postMessage', [], {message:createdMessage}).then(
     function (message) {
       callback(message);
     },
     function (error) {
        console.log("Call failed:", error);
     });
};

createMessage.listen(function (text, threadId, threadName) {
  let message = ChatMessageUtils.getCreatedMessageData(text, threadId, threadName);
  loadingStarted();
  postMessage(message, rawMessage => {
    loadingFinished();
  });
});
