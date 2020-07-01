import React from 'react'

function ItemLine(props) {
  let name = props.item.name
  let description = props.item.description

  return (
    <div>
    <div className="grid-container">
      <div className="grid-item-r">Item Name:</div>
      <div className="grid-item">{name}</div>
      <div className="grid-item-r">Discription:</div>
      <div className="grid-item">{description}</div>
    </div>
    <br />
    </div>
  )
}

export default ItemLine;