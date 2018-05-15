import React from 'react'

export default class Message extends React.Component {

  onChange = (e) => {
    let newData = this.props.messages
    if (this.props.message.selected == true) {
      newData[this.props.message.id - 1].selected = false
    } else {
      newData[this.props.message.id - 1].selected = true
    }
    this.props.newState(newData)
  }

  render() {
    return (
      <div className={this.props.message.selected ? "row message unread selected" : "row message unread"}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              {/* { selected ? <input id={props.data.id} type="checkbox" checked="checked" onChange={props.onChange} /> : <input id={props.data.id} type="checkbox" onChange={props.onChange} />} */}
              <input id={this.props.message.id} type="checkbox" onChange={this.onChange} defaultChecked={!!this.props.message.selected} />
            </div>
            <div className="col-xs-2">
              <i className="star fa fa-star-o" />
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

// const Message = (props) => {
//   let selected = props.data.selected
//   console.log(selected)
//   return (
//     <div className={selected ? "row message unread selected" : "row message unread"}>
//       <div className="col-xs-1">
//         <div className="row">
//           <div className="col-xs-2">
//             {/* { selected ? <input id={props.data.id} type="checkbox" checked="checked" onChange={props.onChange} /> : <input id={props.data.id} type="checkbox" onChange={props.onChange} />} */}
//             <input id={props.data.id} type="checkbox" onChange={props.onChange} defaultChecked={!!props.data.selected} />
//           </div>
//           <div className="col-xs-2">
//             <i className="star fa fa-star-o" />
//           </div>
//         </div>
//       </div>
//       <div className="col-xs-11">
//         <a href="#">
//           { props.data.subject }
//         </a>
//       </div>
//     </div>
//   )
// }

// export default Message
