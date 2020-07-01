import React from 'react'
import ItemLine from './itemLine.js'

function ItemList(props) {

  return ( 
    <React.Fragment>
      <h3>Items:</h3>
      {props.items.map((item, index) => <ItemLine item={item} key={index}/>)}
    </React.Fragment>
  )
}

export default ItemList;