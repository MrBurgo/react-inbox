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

// TOOLBAR COMPONENT
export default class Toolbar extends React.Component {

  // CHECK IF ELEMENT IS SELECTED
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

  // MARK SELECTED MESSAGES AS READ/UNREAD
  readStatus = (e) => {
    let messages = this.props.messages
    let selected = messages.filter(x => x.selected === true)
    messages.forEach(x => {
      for (let i = 0; i < selected.length; i++) {
        if (x.id === selected[i].id) {
          if (e.target.innerText === 'Mark As Read') {
            messages[x.id - 1].read = true
          } else {
            messages[x.id - 1].read = false
          }
        }
      }
    })
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
      div = <button className="btn btn-default" onClick={this.readStatus} >
              { label }
            </button>
    }
    return div
  }

  // COUNT NUMBER OF UNREAD MESSAGES
  unread = () => {
    const messages = this.props.messages
    let count = 0
    messages.forEach(x => {
      if (x.read === false) {
        count++
      }
    })
    return count
  }

  // ADD NEW LABEL TO SELECTED
  newLabel = (e) => {
    let messages = this.props.messages
    let selected = messages.filter(x => x.selected === true)
    messages.forEach(x => {
      for (let i = 0; i < selected.length; i++) {
        if (x.id === selected[i].id) {
          if (!selected[i].labels.includes(e.target.value) && e.target.value !== 'Apply label') {
            messages[x.id - 1].labels.push(e.target.value)
          }
        }
      }
    })
    this.props.newState(messages)
  }

  // REMOVE LABEL FROM SELECTED MESSAGES
  removeLabel = (e) => {
    let messages = this.props.messages
    let selected = messages.filter(x => x.selected === true)
    messages.forEach(x => {
      for (let i = 0; i < selected.length; i++) {
        if (x.id === selected[i].id) {
          if (selected[i].labels.includes(e.target.value) && e.target.value !== 'Apply label') {
            messages[x.id - 1].labels = messages[x.id - 1].labels.filter(x => x !== e.target.value)
          }
        }
      }
    })
    this.props.newState(messages)
  }

  // DELETE ANY SELECTED MESSAGES
  deleteMessage = () => {
    let messages = this.props.messages
    let selected = messages.filter(x => x.selected === true)
    messages.forEach(x => {
      for (let i = 0; i < selected.length; i++) {
        messages = messages.filter(x => x.id !== selected[i].id)
      }
    })
    this.props.newState(messages)
  }

  // HIDE/SHOW FORM ON CLICK
  toggleForm = () => {
    if (this.props.formHidden) {
      return this.props.hideForm('')
    } else {
      return this.props.hideForm('hidden')
    }
  }


  render() {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{ this.unread() }</span>
            unread messages
          </p>

          <a className="btn btn-danger" onClick={this.toggleForm}>
            <i className="fa fa-plus"></i>
          </a>

          <button className="btn btn-default" onClick={this.onClick}>
            <AllSelected checked={this.checked} />
          </button>

          { this.disabled('Mark As Read') }

          { this.disabled('Mark as Unread') }

          <select className="form-control label-select" onChange={this.newLabel}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" onChange={this.removeLabel}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" onClick={this.deleteMessage}>
            <i className="fa fa-trash-o" />
          </button>
        </div>
      </div>
    )
  }
}
