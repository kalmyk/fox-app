import React from 'react'
import { Subscribe } from 'unstated'
import messageSendingContainer from '../containers/messageSending'

export default function MessageSending () {
  return (
    <Subscribe to={[messageSendingContainer]}>
      {msc => (

        <div className='message-sending'>
          {msc.state.messageSending
            ? <span>Message Sinding...</span>
            : null
          }
        </div>

      )}
    </Subscribe>
  )
}
