import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'

class App extends Component {
  render() {
    return (
      <div className="container">
        <Toolbar />
        <MessageList />
      </div>
    )
  }
}

export default App
