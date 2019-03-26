'use strict'

const FoxRouter = require('fox-wamp')
const QMSG = require('fox-wamp/lib/messages')

let messages = [
  {
    id: 'm_1',
    threadID: 't_1',
    threadName: 'Jing and Bill',
    authorName: 'Bill',
    text: 'Hey Jing, want to give a Flux talk at ForwardJS?',
    timestamp: Date.now() - 99999
  },
  {
    id: 'm_2',
    threadID: 't_1',
    threadName: 'Jing and Bill',
    authorName: 'Bill',
    text: 'Seems like a pretty cool conference.',
    timestamp: Date.now() - 89999
  },
  {
    id: 'm_3',
    threadID: 't_1',
    threadName: 'Jing and Bill',
    authorName: 'Jing',
    text: 'Sounds good.  Will they be serving dessert?',
    timestamp: Date.now() - 79999
  },
  {
    id: 'm_4',
    threadID: 't_2',
    threadName: 'Dave and Bill',
    authorName: 'Bill',
    text: 'Hey Dave, want to get a beer after the conference?',
    timestamp: Date.now() - 69999
  },
  {
    id: 'm_5',
    threadID: 't_2',
    threadName: 'Dave and Bill',
    authorName: 'Dave',
    text: 'Totally!  Meet you at the hotel bar.',
    timestamp: Date.now() - 59999
  },
  {
    id: 'm_6',
    threadID: 't_3',
    threadName: 'Bill and Brian',
    authorName: 'Bill',
    text: 'Hey Brian, are you going to be talking about functional stuff?',
    timestamp: Date.now() - 49999
  },
  {
    id: 'm_7',
    threadID: 't_3',
    threadName: 'Bill and Brian',
    authorName: 'Brian',
    text: 'At ForwardJS?  Yeah, of course.  See you there!',
    timestamp: Date.now() - 39999
  }
]

class WampData extends FoxRouter {
  constructor () {
    super()

    // create realm
    this.getRealm('realm1', function (realm) {
      let api = realm.wampApi()

      api.register('chat.getMessages', function (id, args, kwargs) {
        api.resrpc(id, null /* no error */, messages)
      })

      api.subscribe('chat.messages', (qid, args, kwargs) => {
        messages.push(kwargs.message)
        // console.log('EVENT', kwargs)
      })
    })

    this.on(QMSG.ON_SUBSCRIBED, (realm, actorTrace) => {
      if (actorTrace.getUri() === 'tb.ticket') {
        actorTrace.sendEvent({ data: { id: 1, title: 'ticket title 1' } })
        actorTrace.sendEvent({ data: { id: 2, title: 'ticket title 2' } })
      }
    })
  }
}

exports.WampData = WampData
