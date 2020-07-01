import React from 'react';
import './App.css';
import UserList from './listUsers'
import CompanyList from './listCompanies'
import ItemList from './listItems'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users : [],
      manufacturers : [],
      customers : [],
      items : [],
      purchase_orders : [],
      sales_orders : [],
    }
    this.fetchUsers = this.fetchUsers.bind(this)
    this.fetchManufacturers = this.fetchManufacturers.bind(this)
    this.fetchCustomers = this.fetchCustomers.bind(this)
    this.fetchItems = this.fetchItems.bind(this)
    this.fetchPurchaseOrders = this.fetchPurchaseOrders.bind(this)
    this.fetchSalesOrders = this.fetchSalesOrders.bind(this)
  }

  async fetchUsers() {
    await fetch(`http://localhost:3001/users`)
      .then((response) => response.json())
      .then((json) => {this.setState({users: json})})
  }
  async fetchManufacturers() {
    await fetch(`http://localhost:3001/manufacturers`)
      .then((response) => response.json())
      .then((json) => {this.setState({manufacturers: json})})
  }
  
  async fetchCustomers() {
    await fetch(`http://localhost:3001/customers`)
      .then((response) => response.json())
      .then((json) => {this.setState({customers: json})})
  }

  async fetchItems() {
    await fetch(`http://localhost:3001/items`)
      .then((response) => response.json())
      .then((json) => {this.setState({items: json})})
  }

  async fetchPurchaseOrders() {
    await fetch(`http://localhost:3001/purchase_orders`)
      .then((response) => response.json())
      .then((json) => {this.setState({purchase_orders: json})})
  }

  async fetchSalesOrders() {
    await fetch(`http://localhost:3001/sales_orders`)
      .then((response) => response.json())
      .then((json) => {this.setState({sales_orders: json})})
  }

  render() {
    if (this.state.users.length === 0) {
      this.fetchUsers()
    }
    if (this.state.manufacturers.length === 0) {
      this.fetchManufacturers()
    }
    if (this.state.customers.length === 0) {
      this.fetchCustomers()
    }
    if (this.state.items.length === 0) {
      this.fetchItems()
    }
    
    return (
      <div>
        <UserList users={this.state.users} />
        <br />
        <CompanyList companies={this.state.manufacturers} type="Manufacturers"/>
        <br />
        <CompanyList companies={this.state.customers} type="Customers"/>
        <br />
        <ItemList items={this.state.items} />
      </div>
    )
  }
}

export default App;
