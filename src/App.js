import React, { Component } from 'react'
import './App.css'
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import NewMessage from './components/NewMessage'
const API = 'http://localhost:8082/api/messages'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      formHidden: 'hidden'
    }
  }

  // GET MESSAGES FROM API CALL AND SET STATE
  async componentDidMount() {
    const response = await fetch(API)
    if (response.status === 200) {
      const json = await response.json()
      const messages = json._embedded.messages
      this.setState({
        ...this.state.formHidden,
        messages
      })
    } else {
      console.log('Couldn\'t Fetch JSON: ', response.status)
    }
  }

  // SET STATE AND SEND INFO TO API WHEN USER CHANGE OCCURS
  newState = (data) => {
    this.setState({
      ...this.state.formHidden,
      messages: data
    })
  }

  // SEND A NEW MESSAGE TO STATE AND API WHEN USER ADDS THROUGH FORM
  newMessage = async (data) => {
    const response = await fetch(API, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    if (response.status === 200) {
      const json = await response.json()
      this.setState({
        ...this.state.formHidden,
        messages: [...this.state.messages, json]
      })
    } else {
      console.log('Couldn\'t Post New Message: ', response.status)
    }
  }

  // TOGGLES FORM HIDDEN STATE WHEN USER CLICKS RED PLUS OR SEND ON FORM
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
