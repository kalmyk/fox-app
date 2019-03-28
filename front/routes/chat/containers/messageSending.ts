'use strict'

import { Container } from 'unstated'

type MessageSending = {
    messageSending: boolean
}

class MessageSendingContainer extends Container<MessageSending> {

    state = {
        messageSending: false
    }

    loadingStarted() {
        this.setState({messageSending: true})
    }
  
    loadingFinished() {
        this.setState({messageSending: false})
    }  
}

export default new MessageSendingContainer()
