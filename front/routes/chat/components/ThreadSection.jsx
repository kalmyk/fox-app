import React from 'react'
import Modal from 'react-modal'
import { Button } from 'reactstrap'
import { Subscribe } from 'unstated'
import classNames from 'classnames'

import MessageSending from './MessageSending'

import messageThreadContainer from '../containers/messageThread'

function ThreadItem (props) {
  return (
    <li
      className={classNames({
        'thread-list-item': true,
        'active': props.active
      })}
      onClick={() => messageThreadContainer.onClickThread(props.threadId)}>
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

function ThreadList (props) {
  let resultList = []
  props.thread.forEach((thread, threadId) => {
    resultList.push(
      <ThreadItem
        key={threadId}
        threadId={thread.threadId}
        active={props.curThreadId === thread.threadId}
        name={thread.name}
        text={thread.text}
        date={new Date()}
      />
    )
  })

  return (
    <ul className='thread-list'>
      {resultList}
    </ul>
  )
}

function UnreadSection () {
  return (
    <Subscribe to={[messageThreadContainer]}>
      {mtc => (

        <div className='thread-count'>
          {mtc.state.unreadCount === 0
            ? null
            : <span>Unread threads: {mtc.state.unreadCount}</span>
          }
        </div>

      )}
    </Subscribe>
  )
}
/*
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

            <NewTicketDialog that={this} />
*/
export default class ThreadSection extends React.Component {
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
            <ThreadList
              thread={mtc.state.thread}
              curThreadId={mtc.state.curThreadId}
            />
            <UnreadSection />
            <MessageSending />
          </div>

        )}
      </Subscribe>
    )
  }
}
