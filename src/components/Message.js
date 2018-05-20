import React from 'react'

export default class Message extends React.Component {

  // CHANGE CHECKED/UNCHECKED ON BOX CLICK
  onChange = (e) => {
    let newData = this.props.messages
    if (this.props.message.selected === true) {
      newData[this.props.message.id - 1].selected = false
    } else {
      newData[this.props.message.id - 1].selected = true
    }
    this.props.newState(newData)
  }

  // FAVOIRTE/UNFAVORITE MESSAGE ON STAR CLICK
  starSelect = (e) => {
    let newData = this.props.messages
    if (this.props.message.starred === true) {
      newData[this.props.message.id - 1].starred = false
    } else {
      newData[this.props.message.id - 1].starred = true
    }
    this.props.newState(newData)
  }

  // GENERATE LABELS FOR EACH MESSAGE
  generateLabels = () => {
    let labels
    if (this.props.message.labels.length > 0) {
      labels =  this.props.message.labels.map((x, i) => <span key={i} className="label label-warning">{x}</span>)
    }
    return labels
  }

  // CHECK IF MESSAGE HAS BEEN READ OR NOT AND CHANGE CLASSNAMES ACCORDINGLY
  read = () => {
    let read
    if (this.props.message.read === true) {
      if (this.props.message.selected) {
        read = "row message read selected"
      } else {
        read = "row message read"
      }
    } else {
      if (this.props.message.selected) {
        read = "row message unread selected"
      } else {
        read = "row message unread"
      }
    }
    return read
  }

  // ON MESSAGE CLICK, MARK AS READ
  readStatus = (e) => {
    let messages = this.props.messages
    let message = this.props.message
    if (e.target.parentNode.parentNode.classList.value.includes('unread')) {
      messages[message.id - 1].read = true
    }
    this.props.newState(messages)
  }

  render() {
    return (
      <div className={this.read()}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" onChange={this.onChange} checked={this.props.message.selected} />
            </div>
            <div className="col-xs-2">
              <i className={ this.props.message.starred ? "star fa fa-star" : "star fa fa-star-o"} onClick={this.starSelect} />
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          { this.generateLabels() }
          <a href="#" onClick={this.readStatus}>
            { this.props.message.subject }
          </a>
        </div>
      </div>
    )
  }
}
