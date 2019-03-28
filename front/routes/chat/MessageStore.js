import Reflux from 'reflux'
import array from 'lodash/array'
import collection from 'lodash/collection'
import * as Actions from './actions'

function convertRawMessage (rawMessage, threadId) {
  return {
    ...rawMessage,
    date: new Date(rawMessage.timestamp),
    isRead: rawMessage.threadID === threadId
  }
}

export default class MessageStore extends Reflux.Store {
  constructor () {
    super()

    this.state.threads = {}
    this.state.currentThreadID = null
    this.state.currentThreadName = 'CUR-THREAD-NAME'
    this.state.unreadCount = 0

    this.listenToMany(Actions)
  }

  calcUnreadCount (threads) {
    let unreadCount = 0
    for (let threadId in threads) {
      if (!array.last(threads[threadId]).isRead) {
        unreadCount++
      }
    }
    return unreadCount
  }

  onMessageArrived (rawMessage) {
    let message = convertRawMessage(rawMessage)
    message.isRead = message.threadID === this.state.currentThreadID
    this.state.threads[message.threadID].push(message)
    this.setState({
      threads: this.state.threads,
      unreadCount: this.calcUnreadCount(this.state.threads)
    })
  }

  onClickThread (threadId) {
    let msgs = this.state.threads[threadId]

    for (let message of msgs) {
      message.isRead = true
    }

    this.setState({
      currentThreadID: threadId,
      currentThreadName: msgs[0].threadName,
      unreadCount: this.calcUnreadCount(this.state.threads)
    })
  }

  onLoadRawMessagesCompleted (rawMessages) {
    let messages = rawMessages.map(m => {
      return convertRawMessage(m)
    })

    let threads = collection.groupBy(messages, 'threadID')
    let lastThreadId

    Object.keys(threads).forEach(threadID => {
      lastThreadId = threadID
    })

    Object.keys(threads).forEach(threadID => {
      threads[threadID].map(message => {
        message.isRead = message.threadID === lastThreadId
        return message
      })
    })

    this.setState({
      currentThreadID: lastThreadId,
      currentThreadName: threads[lastThreadId][0].threadName,
      threads: threads,
      unreadCount: this.calcUnreadCount(threads)
    })
  }
}
