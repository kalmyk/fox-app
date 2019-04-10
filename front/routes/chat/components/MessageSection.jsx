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
  render () {
    return (
      <Subscribe to={[messageThreadContainer]}>
        {mtc => (

          <div className='message-section'>
            <h3 className='message-thread-heading'>{mtc.state.curThreadName}</h3>
            <ul className='message-list' ref='messageList'>
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
    console.log('componentDidUpdate');
    
    this._scrollToBottom()
  }

  _scrollToBottom () {
    if (this.refs.messageList) {
      let ul = ReactDOM.findDOMNode(this.refs.messageList)
      ul.scrollTop = ul.scrollHeight
    }
  }
}
