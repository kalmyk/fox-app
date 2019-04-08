
export function getCreatedMessageData (text, threadId, threadName) {
  var timestamp = Date.now()
  return {
    id: 'm_' + timestamp,
    threadID: threadId,
    threadName: threadName,
    authorName: 'Bill', // hard coded for the example
    date: new Date(timestamp),
    text: text,
    isRead: true
  }
}

export function randomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min // The maximum is inclusive and the minimum is inclusive
}
