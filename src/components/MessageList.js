import React from 'react'
import Message from './Message'

export default class MessageList extends React.Component {

  render() {
    return (
      <div>
        { this.props.messages.map((message, i) => <Message key={i} message={message} messages={this.props.messages} onChange={this.props.onChange} newState={this.props.newState} patchMessage={this.props.patchMessage} />)}
      </div>
    )
  }
}
