import React from 'react'
import Message from './Message'

export default class MessageList extends React.Component {

  render() {
    return (
      <div>
        { this.props.messages.map(message => <Message key={message.id} message={message} messages={this.props.messages} onChange={this.props.onChange} newState={this.props.newState} />)}
      </div>
    )
  }
}
