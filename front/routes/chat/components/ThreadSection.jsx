import React from 'react';
import Reflux from 'reflux';
import Modal from 'react-modal';
import array from 'lodash/array';
import ThreadListItem from './ThreadListItem';
import MessageSending from './MessageSending';
import MessageStore from '../MessageStore';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class UnreadSection extends Reflux.Component {

  constructor(props) {
    super(props);
    this.store = MessageStore;
    this.storeKeys = ['unreadCount'];
  }

  render() {

    let unread =
      this.state.unreadCount === 0 ?
      null :
      <span>Unread threads: {this.state.unreadCount}</span>;

    return (
      <div className="thread-count">
        {unread}
      </div>
    );
  }
}

function NewTicketDialog(props) {
  return (
    <div>
    <Modal
      isOpen={props.that.state.modalIsOpen}
      onAfterOpen={props.that.afterOpenModal}
      onRequestClose={props.that.closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h2 ref={subtitle => props.that.subtitle = subtitle}>Hello</h2>
      <div>new ticket</div>
      <form>
        <input />
        <button>tab navigation</button>
        <button>the modal</button>
      </form>
      <button onClick={() => props.that.closeModal()}>close</button>
    </Modal>
  </div>
)}

export default class ThreadSection extends Reflux.Component {

  constructor(props) {
    super(props);
    this.store = MessageStore;
    this.storeKeys = ['threads', 'currentThreadID'];
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    let threadListItems = Object.keys(this.state.threads).map(threadID => {
      let messages = this.state.threads[threadID];
      return (
        <ThreadListItem
          key={threadID}
          lastMessage={array.last(messages)}
          currentThreadID={this.state.currentThreadID}
        />
      );
    });

    return (
      <div className="thread-section">
        <UnreadSection />
        <button onClick={() => this.openModal()}>Open Modal</button>
        <NewTicketDialog that={this} />
        <ul className="thread-list">
          {threadListItems}
        </ul>
        <MessageSending />
      </div>
    );
  }

};
