'use strict'

import { Container } from 'unstated'

type MessageSending = {
    messageSending: number
}

class MessageSendingContainer extends Container<MessageSending> {

  state = {
    messageSending: 0
  }

  loadingStarted() {
    this.setState({messageSending: ++this.state.messageSending})
  }

  loadingFinished() {
    this.setState({messageSending: --this.state.messageSending})
  }  

}

export default new MessageSendingContainer()
