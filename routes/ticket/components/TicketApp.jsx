import React from 'react'

export default class IssueApp extends React.Component {

  componentDidMount() {
    console.log('did-mount');
  }

  componentWillUnmount() {
    console.log('will-unmount');
  }

  render() {
    const events = [
      { id: 1, title: 'to do 1' },
      { id: 2, title: 'to do 2' },
      { id: 3, title: 'to do 3' },
      { id: 4, title: 'to do 4' },
      { id: 5, title: 'to do 5' }
    ]

    return (
      <div>
        <h2>Issue</h2>
        <button>Add New</button>
        <ul>
          {events.map(event => (
            <li key={event.id}>{event.title}</li>
          ))}
        </ul>
      </div>
    )
  }
}
