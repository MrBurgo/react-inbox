import React from 'react'

// SET CHECKBOX TO SPECIFIC VISUAL BASED ON NUMBER OF CHECKED MESSAGES
function AllSelected(props) {
  let div
  if (props.checked() === 'All') {
    div = <i className="fa fa-check-square-o" />
  } else if (props.checked() === 'Some') {
    div = <i className="fa fa-minus-square-o" />
  } else {
    div = <i className="fa fa-square-o" />
  }
  return div
}

export default class Toolbar extends React.Component {

  selectCheck = (element) => {
    return element === true
  }

  // CHECK IF NONE, SOME, OR ALL OF MESSAGES ARE SELECTED
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

  // SELECT/UNSELECT MESSAGE ON CHECKBOX CLICK THEN UPDATE STATE
  onClick = () => {
    let messages = this.props.messages
    if (this.checked() === 'All') {
      messages.forEach(x => x.selected = false)
    } else {
      messages.forEach(x => x.selected = true)
    }
    this.props.newState(messages)
  }

  // CHECK IF ANY BOXES ARE SELECTED. IF SO, ENABLE READ/UNREAD BUTTONS
  disabled = (label) => {
    let div
    if (this.checked() === 'None') {
      div = <button className="btn btn-default" disabled >
              { label }
            </button>
    } else {
      div = <button className="btn btn-default">
              { label }
            </button>
    }
    return div
  }

  render() {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">2</span>
            unread messages
          </p>

          <a className="btn btn-danger">
            <i className="fa fa-plus"></i>
          </a>

          <button className="btn btn-default" onClick={this.onClick}>
            <AllSelected checked={this.checked} />
          </button>

          { this.disabled('Mark As Read') }

          { this.disabled('Mark as Unread') }

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
