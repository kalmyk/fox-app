import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

import messageThreadContainer from '../containers/messageThread'

let ENTER_KEY_CODE = 13

/*
    http://omegatracker.herokuapp.com/project/mikeproj

    Available commands:

        /create <description>
        /critical <id>
        /tag <id> <tag>
        /untag <id>
        /assign <id> [<user>]
        /unassign <id>
        /edit <id> <description>
        /close <id>
        /reopen <id>
        /export
*/

class MessageComposer extends React.Component {
  constructor (props) {
    super(props)
    this.state = { text: '' }
  }

  render () {
    return (
      <div>
        <textarea
          className='message-composer'
          value={this.state.text}
          onChange={this._onChange.bind(this)}
          onKeyDown={this._onKeyDown.bind(this)}
        />
        <Button color='primary' onClick={() => this.composeMessage()}>send</Button>{' '}
      </div>
    )
  }

  composeMessage () {
    let text = this.state.text.trim()
    if (text) {
      messageThreadContainer.composeMessage(text)
    }
    this.setState({ text: '' })
  }

  _onChange (event, value) {
    this.setState({ text: event.target.value })
  }

  _onKeyDown (event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault()
      this.composeMessage()
    }
  }
}

MessageComposer.propTypes = {
  threadId: PropTypes.number.isRequired
}

export default MessageComposer
