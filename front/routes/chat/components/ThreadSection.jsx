import React from 'react'
import Reflux from 'reflux'
import Modal from 'react-modal'
import { Button } from 'reactstrap'
import { Subscribe } from 'unstated'
import classNames from 'classnames'

import MessageSending from './MessageSending'
import MessageStore from '../MessageStore'
import * as Actions from '../actions'

import messageThreadContainer from '../containers/messageThread'

const customStyles = {
  content: {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
}

function ThreadListItem (props) {
  return (
    <li
      className={classNames({
        'thread-list-item': true,
        'active': props.active
      })}
      onClick={() => Actions.clickThread(props.threadID)}>
      <h5 className='thread-name'>{props.name}</h5>
      <div className='thread-time'>
        {props.date.toLocaleTimeString()}
      </div>
      <div className='thread-last-message'>
        {props.text}
      </div>
    </li>
  )
}

class UnreadSection extends Reflux.Component {
  constructor (props) {
    super(props)
    this.store = MessageStore
    this.storeKeys = ['unreadCount']
  }

  render () {
    let unread =
      this.state.unreadCount === 0
        ? null
        : <span>Unread threads: {this.state.unreadCount}</span>

    return (
      <div className='thread-count'>
        {unread}
      </div>
    )
  }
}

function NewTicketDialog (props) {
  return (
    <div>
      <Modal
        isOpen={props.that.state.modalIsOpen}
        onAfterOpen={props.that.afterOpenModal}
        onRequestClose={props.that.closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <h2 ref={ subtitle => props.that.subtitle = subtitle }>Hello</h2>
        <div>new ticket</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>the modal</button>
        </form>
        <button onClick={() => props.that.closeModal()}>close</button>
      </Modal>
    </div>
  )
}

export default class ThreadSection extends Reflux.Component {
  constructor (props) {
    super(props)
    this.store = MessageStore
    this.storeKeys = ['threads', 'currentThreadID']
  }

  createThread () {
    messageThreadContainer.modeNewThread()
  }

  openModal () {
    this.setState({ modalIsOpen: true })
  }

  afterOpenModal () {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00'
  }

  closeModal () {
    this.setState({ modalIsOpen: false })
  }

  render () {
    return (

      <Subscribe to={[messageThreadContainer]}>
        {mtc => (

          <div className='thread-section'>
            <div>
              <Button color='primary' onClick={() => this.createThread()}>New Thread</Button>{' '}
            </div>
            <NewTicketDialog that={this} />
            <ul className='thread-list'>
              { mtc.state.thread.map(thread => {
                return (
                  <ThreadListItem
                    key={thread.id}
                    threadID={thread.id}
                    active={false}
                    name={thread.name}
                    text={thread.text}
                    date={new Date()}
                  />
                )
              })}
            </ul>
            <UnreadSection />
            <MessageSending />
          </div>

        )}
      </Subscribe>
    )
  }
}
