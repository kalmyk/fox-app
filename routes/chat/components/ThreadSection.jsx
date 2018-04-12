import React from 'react';
import Reflux from 'reflux';
import array from 'lodash/array';
import ThreadListItem from './ThreadListItem';
import MessageSending from './MessageSending';
import MessageStore from '../MessageStore';

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

export default class ThreadSection extends Reflux.Component {

  constructor(props) {
    super(props);
    this.store = MessageStore;
    this.storeKeys = ['threads', 'currentThreadID'];
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
        <ul className="thread-list">
          {threadListItems}
        </ul>
        <MessageSending />
      </div>
    );
  }

};
