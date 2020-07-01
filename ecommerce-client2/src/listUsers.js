import React from 'react'
import UserLine from './userLine.js'

function UserList(props) {

  return ( 
    <React.Fragment>
      <h3>Users:</h3>
      {props.users.map((user, index) => <UserLine user={user} key={index}/>)}
    </React.Fragment>
  )
}

  export default UserList;