import React from 'react';
import PropTypes from 'prop-types';
import * as Actions from '../actions';

let ENTER_KEY_CODE = 13;

class MessageComposer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <textarea
        className="message-composer"
        name="message"
        value={this.state.text}
        onChange={this._onChange.bind(this)}
        onKeyDown={this._onKeyDown.bind(this)}
      />
    );
  }

  _onChange(event, value) {
    this.setState({text: event.target.value});
  }

  _onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      let text = this.state.text.trim();
      if (text) {
        Actions.createMessage(text, this.props.threadId, this.props.threadName);
      }
      this.setState({text: ''});
    }
  }

};

MessageComposer.propTypes = {
  threadId: PropTypes.string.isRequired,
  threadName: PropTypes.string.isRequired
};

export default MessageComposer;
