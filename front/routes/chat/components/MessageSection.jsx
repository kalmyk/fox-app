import React from 'react'
import { Subscribe } from 'unstated'
import ReactDOM from 'react-dom'
import MessageComposer from './MessageComposer'

import messageThreadContainer from '../containers/messageThread'

function MessageItem (props) {
  return (

    <li className='message-list-item'>
      <h5 className='message-author-name'>{props.message.authorName}</h5>
      <div className='message-time'>
        {props.message.date.toLocaleTimeString()}
      </div>
      <div className='message-text'>{props.message.text}</div>
    </li>

  )
}

export default class MessageSection extends React.Component {
  constructor (props) {
    super(props)

    this.ulMessageList = null

    this.setUlMessageListRef = element => {
      this.ulMessageList = element
    }
  }

  render () {
    return (
      <Subscribe to={[messageThreadContainer]}>
        {mtc => (

          <div className='message-section'>
            <h3 className='message-thread-heading'>{mtc.state.curThreadName}</h3>
            <ul className='message-list' ref={this.setUlMessageListRef}>
              {mtc.state.messages.map(message =>
                <MessageItem
                  key={message.id}
                  message={message}
                />
              )}
            </ul>
            {
              mtc.state.curThreadId
                ? <MessageComposer threadId={mtc.state.curThreadId} threadName={mtc.state.curThreadName} />
                : null
            }
          </div>

        )}
      </Subscribe>
    )
  }

  componentDidUpdate () {
    console.log('componentDidUpdate')
    this._scrollToBottom()
  }

  _scrollToBottom () {
    if (this.ulMessageList) {
      console.log('_scrollToBottom')
//    let ul = ReactDOM.findDOMNode(this.refs.messageList)
      this.ulMessageList.scrollTop = this.ulMessageList.scrollHeight
    }
  }
}
