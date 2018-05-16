import React from 'react'

export default class Message extends React.Component {

  onChange = (e) => {
    let newData = this.props.messages
    if (this.props.message.selected === true) {
      newData[this.props.message.id - 1].selected = false
    } else {
      newData[this.props.message.id - 1].selected = true
    }
    this.props.newState(newData)
  }

  starSelect = (e) => {
    let newData = this.props.messages
    if (this.props.message.starred === true) {
      newData[this.props.message.id - 1].starred = false
    } else {
      newData[this.props.message.id - 1].starred = true
    }
    this.props.newState(newData)
  }

  render() {
    return (
      <div className={this.props.message.selected ? "row message unread selected" : "row message unread"}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input id={this.props.message.id} type="checkbox" onChange={this.onChange} selected={this.props.message.selected} checked={this.props.message.selected} />
            </div>
            <div className="col-xs-2">
              <i className={ this.props.message.starred ? "star fa fa-star" : "star fa fa-star-o"} onClick={this.starSelect} />
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          <a href="#">
            { this.props.message.subject }
          </a>
        </div>
      </div>
    )
  }
}
