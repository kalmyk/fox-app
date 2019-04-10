'use strict'

import 'babel-polyfill'
import { Container } from 'unstated'
import * as dataServer from '../../../main/dataServer'
import * as ChatMessageUtils from '../ChatMessageUtils'

import messageSendingContainer from './messageSending'

type MessageItem = {
  id: number,
  text: string,
  date: Date
}

type ThreadItem = {
  id: number,
  name: string,
  text: string,
  date: Date,
  isRead: boolean,
  messages: Array<MessageItem>
}

type TheadsState = {
  thread: Map<string, ThreadItem>,
  newThread: boolean,
  curThreadId: number,
  unreadCount: number,
  messages: Array<MessageItem>
}

class MessageThreadContainer extends Container<TheadsState> {

  state = {
    thread: new Map(),
    newThread: false,
    curThreadId: -1,
    unreadCount: 0,
    messages: []
  }

  calcUnreadCount () {
    let unreadCount = 0
    for (let thread of this.state.thread) {
      if (!thread.isRead) {
        unreadCount++
      }
    }
    return unreadCount
  }

  onClickThread (threadId) {
//    this.state.thread[threadId].isRead = true
    this.setState({
      curThreadId: threadId,
      unreadCount: this.calcUnreadCount(),
      newThread: false,
      messages: this.state.thread.has(threadId) ? this.state.thread.get(threadId).messages : []
    })
  }

  async composeMessage (text) {
    if (this.state.newThread) {
      this.state.curThreadId = ChatMessageUtils.randomInt(10000, 99999)
      this.setState({newThread: false})
    }

    let pkg = {
      timestamp: Date.now(),
      text: text,
      uname: text,
      threadId: this.state.curThreadId
    }
  
    messageSendingContainer.loadingStarted()
    return dataServer.publish(
      'chat.thread.' + this.state.curThreadId,
      [],
      { message: pkg },
      { retain: true, acknowledge: true, exclude_me: false }
    ).then(() => {
      messageSendingContainer.loadingFinished()
    })
  }

  modeNewThread () {
    this.setState({newThread: true})
  }

  threadArrived (rawThread, opts) {
    let item
    let threadId = rawThread.message.threadId
    if (this.state.thread.has(threadId)) {
      item = this.state.thread.get(threadId)
    } else {
      item = {
        threadId: threadId,
        date: rawThread.message.timestamp,
        name: opts.topic,
        isRead: threadId === this.state.curThreadId,
        messages: []
      }
      this.state.thread.set(threadId, item)
    }

    item.messages.push({
      id: opts.publication,
      date: new Date(rawThread.message.timestamp),
      text: rawThread.message.text
    })
    console.log('messages', item.messages);

    let st = {
      thread: this.state.thread,
      unreadCount: this.calcUnreadCount()
    }

    if (this.state.curThreadId === threadId) {
      let thread = this.state.thread.get(threadId)
      st.messages = thread.messages
    }

    this.setState(st)
  }

  connectServer () {
    dataServer.subscribe('chat.thread.#', (args, kwargs, opts) => {
      this.threadArrived(kwargs, opts)
    }, {retain: true})
  }

}

export default new MessageThreadContainer()
