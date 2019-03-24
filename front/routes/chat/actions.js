import Reflux from 'reflux';
import * as ChatMessageUtils from './ChatMessageUtils';
import * as dataServer from '../../main/dataServer';
import messageSendingContainer from './containers/messageSending'

export let loadRawMessages = Reflux.createAction({
  asyncResult: true
});

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
  dataServer.subscribe('chat.messages', onEvent).then(
      (subscription) => {},
      (error) => {
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
  messageSendingContainer.loadingStarted();
  postMessage(message, rawMessage => {
    messageSendingContainer.loadingFinished();
  });
});
