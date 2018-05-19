import React from 'react'

export default class NewMessage extends React.Component {

  state = {
    subject: '',
    body: ''
  }

  onSubmit = (e) => {
    e.preventDefault()
    const newMessage = {
      id: (this.props.messages.length + 1),
      subject: this.state.subject,
      read: false,
      starred: false,
      labels: [],
      body: this.state.body
    }
    this.props.newMessage(newMessage)
    this.props.hideForm('hidden')
  }

  subject = (e) => {
    this.setState({
      subject: e.target.value
    })
  }

  body = (e) => {
    this.setState({
      body: e.target.value
    })
  }

  render() {
    return (
      <form className={`form-horizontal well ${this.props.formHidden}`} >
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" onChange={this.subject} value={this.state.subject} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="body" className="col-sm-2 control-label">Body</label>
          <div className="col-sm-8">
            <textarea name="body" id="body" className="form-control" onChange={this.body} value={this.state.body}></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input type="submit" value="Send" className="btn btn-primary" onClick={this.onSubmit} />
          </div>
        </div>
      </form>
    )
  }
}
