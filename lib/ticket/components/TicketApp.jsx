import React from 'react';
import * as dataServer from '../../dataServer';

export default class TicketApp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      tickets: new Map()
    };

    this.subTicket = null;
  }

  componentDidMount() {
    this.subTicket = dataServer.subscribe(
      'tb.ticket', 
      (args, kwargs, opts) => {
        this.state.tickets.set(kwargs.id, kwargs);
        this.setState({ tickets: this.state.tickets });
      }, 
      {position:123}
    ).then((subscription) => {
      this.subTicket = subscription;
      this.setState({ isLoading: false });
    });
    this.setState({ isLoading: true });
  }

  componentWillUnmount() {
    dataServer.unsubscribe(this.subTicket);
  }

  render() {

    const { tickets, isLoading } = this.state;

    let ticketItems = [];

    tickets.forEach((value, key) => {
      ticketItems.push((
        <li key={key}>{value.title}</li>
      ));
    });
    
    return (
      <div>
        <h2>Issue</h2>
        <button>Add New</button>
        <ul>
          {ticketItems}
        </ul>
      </div>
    )
  }
}
