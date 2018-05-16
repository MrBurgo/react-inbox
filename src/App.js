import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import Seed from './seed.json'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: Seed,
      toolbar: ''
    }
  }

  newState = (data) => {
    this.setState({
      messages: data
    })
  }

  render() {
    return (
      <div className="container">
        <Toolbar selected={this.state.toolbar} messages={this.state.messages} newState={this.newState} />
        <MessageList messages={this.state.messages} onChange={this.onChange} newState={this.newState} />
      </div>
    )
  }
}

export default App
