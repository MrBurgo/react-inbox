import React, { Component } from 'react'
import './App.css'
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import Seed from './seed.json'
import NewMessage from './components/NewMessage'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: Seed,
      formHidden: 'hidden'
    }
  }

  newState = (data) => {
    this.setState({
      ...this.state.formHidden,
      messages: data
    })
  }

  newMessage = (data) => {
    this.setState({
      ...this.state.formHidden,
      messages: [...this.state.messages, data]
    })
  }

  hideForm = (boolean) => {
    this.setState({
      ...this.state.messages,
      formHidden: boolean
    })
  }

  render() {
    return (
      <div className="container">
        <Toolbar selected={this.state.toolbar} messages={this.state.messages} newState={this.newState} hideForm={this.hideForm} formHidden={this.state.formHidden} />
        <NewMessage newMessage={this.newMessage} formHidden={this.state.formHidden} messages={this.state.messages} hideForm={this.hideForm} />
        <MessageList messages={this.state.messages} onChange={this.onChange} newState={this.newState} />
      </div>
    )
  }
}

export default App
