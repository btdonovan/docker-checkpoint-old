import React from 'react'
import CompanyLine from './companyLine.js'

function CompanyList(props) {

  return ( 
    <React.Fragment>
      <h3>{props.type}:</h3>
      {props.companies.map((company, index) => <CompanyLine company={company} key={index}/>)}
    </React.Fragment>
  )
}

export default CompanyList;