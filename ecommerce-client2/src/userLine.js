import React from 'react'

function UserLine(props) {
  // console.log(props.user.address)
  return (
    <div>
    <div className="grid-container">
      <div className="gird-item-r">Full Name:</div>
      <div className="grid-item">{props.user.first_name} {props.user.last_name}</div>
      <div className="grid-item-r">Email:</div>
      <div className="grid-item">{props.user.email}</div>
      <div className="grid-item-r">Address:</div>
      <div className="grid-item">{props.user.address.split('\\n').map((line, index) => <div key={index}>{line}</div>)}</div>
    </div>
    <br />
    </div>
  )
}

export default UserLine;