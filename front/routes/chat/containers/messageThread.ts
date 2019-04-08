'use strict'

import 'babel-polyfill'
import { Container } from 'unstated'
import * as dataServer from '../../../main/dataServer'
import * as ChatMessageUtils from '../ChatMessageUtils'

type ThreadItem = {
  id: number,
  name: string,
  text: string,
  date: Date
}

type MessageThead = {
  thread: Array<ThreadItem>,
  newThread: boolean
}

class MessageThreadContainer extends Container<MessageThead> {

  state = {
    thread: [],
    newThread: false
  }

  async composeMessage (text) {
    let pkg = {
      timestamp: Date.now(),
      text: text
    }
  
    return dataServer.publish(
      'chat.thread.' + ChatMessageUtils.randomInt(1000, 9999),
      [],
      { message: pkg },
      { retain: true, acknowledge: true, exclude_me: false }
    )      
  }

  modeNewThread () {
    this.setState({newThread: true})
  }

  addItem (item: ThreadItem) {
    this.setState({thread: this.state.thread.concat(item) })
  }

  connectServer () {
    dataServer.subscribe('chat.thread.#', (args, kwargs, opts) => {
      console.log('event', args, kwargs, opts)
      this.addItem({ id: opts.publication, date: kwargs.message.timestamp, text: opts.topic, name: opts.topic})

    }, {retain: true})
  }

}

export default new MessageThreadContainer()
