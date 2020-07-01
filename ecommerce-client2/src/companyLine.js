import React from 'react'

function CompanyLine(props) {
  // console.log(props.company.address)
  let company_name = props.company.company_name
  let contact_name = props.company.contact_name
  let contact_email = props.company.contact_email
  let contact_phone = props.company.contact_phone
  let address = props.company.address.split('\\n')
  return (
    <div>
    <div className="grid-container">
      <div className="grid-item-r">Company:</div>
      <div className="grid-item">{company_name}</div>
      <div className="grid-item-r">PoC:</div>
      <div className="grid-item">{contact_name}</div>
      <div className="grid-item-r">Email:</div>
      <div className="grid-item">{contact_email}</div>
      <div className="grid-item-r">Phone:</div>
      <div className="grid-item">{contact_phone}</div>
      <div className="grid-item-r">Address:</div>
      <div className="grid-item">{address.map((line, index) => <div key={index}>{line}</div>)}</div>
    </div>
    <br />
    </div>
  )
}

export default CompanyLine;