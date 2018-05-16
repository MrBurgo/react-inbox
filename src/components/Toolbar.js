import React from 'react'

function AllSelected(props) {
  let div
  if (props.checked() == 'All') {
    div = <i className="fa fa-check-square-o" />
  } else if (props.checked() == 'Some') {
    div = <i className="fa fa-minus-square-o" />
  } else {
    div = <i className="fa fa-square-o" />
  }
  return div
}

export default class Toolbar extends React.Component {

  selectCheck = (element) => {
    return element == true
  }

  checked = () => {
    const arr = this.props.messages.map(x => x.selected)
    let selectedAmount
    if (arr.every(this.selectCheck)) {
      selectedAmount = 'All'
    } else if (arr.some(this.selectCheck)) {
      selectedAmount = 'Some'
    } else {
      selectedAmount = 'None'
    }
    return selectedAmount
  }

  onClick = () => {
    let messages = this.props.messages
    if (this.checked() == 'All') {
      messages.forEach(x => x.selected = false)
    } else {
      messages.forEach(x => x.selected = true)
    }
    this.props.newState(messages)
  }

  render() {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">2</span>
            unread messages
          </p>

          <button className="btn btn-default" onClick={this.onClick}>
            <AllSelected checked={this.checked} />
          </button>

          <button className="btn btn-default">
            Mark As Read
          </button>

          <button className="btn btn-default">
            Mark As Unread
          </button>

          <select className="form-control label-select">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default">
            <i className="fa fa-trash-o" />
          </button>
        </div>
      </div>
    )
  }
}
