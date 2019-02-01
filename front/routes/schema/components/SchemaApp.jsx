import React from 'react'

export default class SchemaApp extends React.Component {

  componentDidMount() {
    console.log('schema-did-mount');
  }

  componentWillUnmount() {
    console.log('schema-will-unmount');
  }

  render() {
    const events = [
      { id: 0, title: 'essay due' }
    ]

    return (
      <div>
        <h2>Schema</h2>
        <ul>
          {events.map(event => (
            <li key={event.id}>{event.title}</li>
          ))}
        </ul>
      </div>
    )
  }
}
