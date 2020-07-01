const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ecommerce',
  host: 'database',
  database: 'ecommerce',
  password: 'password',
  port: 5432,
})

// Generic read, delete, and list functions used for all tables

const readRow = (request, response, tableName) => {
  pool.query(
    `SELECT * FROM ${tableName} WHERE id = $1`, 
    [request.params.id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const deleteRow = (request, response, tableName) => {
  pool.query(
    `DELETE FROM ${tableName} WHERE id = $1`,
    [request.params.id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`successfully deleted ${request.params.id}`)
    }
  )
}

const listRows = (request, response, tableName) => {
  pool.query (
    `SELECT * FROM ${tableName} ORDER BY id ASC`,
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    }
  )
}

// Users

const createUser = (request, response) => {
  let first_name = request.body.first_name
  let last_name = request.body.last_name
  let email = request.body.email
  let address = request.body.address
  pool.query(
    'INSERT INTO users (first_name, last_name, email, address) VALUES ($1, $2, $3, $4)', 
    [first_name, last_name, email, address],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User ${first_name} ${last_name} added.`)
    }
  )
}

// readUser uses readRow

const updateUser = (request, response) => {
  var user
  pool.query(
    'SELECT * FROM users WHERE id = $1',
    [request.params.id],
    (error, results) => {
      if (error) {
        throw error
      }
      if (results.rows.length === 1) {
        user = results.rows[0]
        let newUser = {...user, ...request.body}
        let firstName = newUser.first_name
        let lastName = newUser.last_name
        let email = newUser.email
        let address = newUser.address
        let id = newUser.id
        pool.query(
          'UPDATE users SET first_name = $1, last_name = $2, email = $3, address = $4 WHERE id = $5',
          [firstName, lastName, email, address, id],
          (error, results) => {
            if (error) {
              throw error
            }
            response.send(`updated user ${id}`)
          }
        )
      }
    }
  )
}
// deleteUser uses deleteRow
// listUsers uses listRows

// manufacturers and customers are nearly identical and use the same functions

const createCompany = (request, response, tableName) => {
  let company_name = request.body.company_name
  let contact_name = request.body.contact_name
  let contact_email = request.body.contact_email
  let contact_phone = request.body.contact_phone
  pool.query(
    `INSERT INTO ${tableName} (company_name, contact_name, contact_email, contact_phone) VALUES ($1, $2, $3, $4)`, 
    [company_name, contact_name, contact_email, contact_phone],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`${tableName.slice(0, tableName.length - 1)} ${company_name} added.`)
    }
  )
}

// readCompany uses readRow

const updateCompany = (request, response, tableName) => {
  let company
  pool.query(
    `SELECT * FROM ${tableName} WHERE id = $1`,
    [request.params.id],
    (error, results) => {
      if (error) {
        throw error
      }
      if (results.rows.length === 1) {
        company = results.rows[0]
        let newCompany = {...company, ...request.body}
        let company_name = newCompany.company_name
        let contact_name = newCompany.contact_name
        let contact_email = newCompany.contact_email
        let contact_phone = newCompany.contact_phone
        let id = newCompany.id
        pool.query(
          `UPDATE ${tableName} SET company_name = $1, contact_name = $2, contact_email = $3, contact_phone = $4 WHERE id = $5`,
          [company_name, contact_name, contact_email, contact_phone, id],
          (error, results) => {
            if (error) {
              throw error
            }
            response.send(`updated ${tableName.slice(0, tableName.length - 1)} ${id}`)
          }
        )
      }
    }
  )
}

// deleteCompany uses deleteRow
// listCompanies uses listRows

// Items

const createItem = (request, response) => {
  let name = request.body.name
  let description = request.body.description
  pool.query(
    'INSERT INTO items (name, description) VALUES ($1, $2)', 
    [name, description],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Item ${name} ${description} added.`)
    }
  )
}

// readItem uses readRow

const updateItem = (request, response) => {
  var item
  pool.query(
    'SELECT * FROM items WHERE id = $1',
    [request.params.id],
    (error, results) => {
      if (error) {
        throw error
      }
      if (results.rows.length === 1) {
        item = results.rows[0]
        let newItem = {...item, ...request.body}
        let name = newItem.name
        let description = newItem.description
        let id = newItem.id
        pool.query(
          'UPDATE items SET name = $1, description = $2 WHERE id = $3',
          [name, description, id],
          (error, results) => {
            if (error) {
              throw error
            }
            response.send(`updated item ${id}`)
          }
        )
      }
    }
  )
}

// deleteItem uses deleteRow
// list Items uses listRows

// Purchase Orders

const createPurchaseOrder = (request, response) => {
  let sales_order = request.body.sales_order
  let manufacturer_id = request.body.manufacturer_id
  let date_ordered = request.body.date_ordered
  let date_received = request.body.date_received
  pool.query(
    `INSERT INTO purchase_orders (sales_order, manufacturer_id, date_ordered, date_received) VALUES ($1, $2, $3, $4)`, 
    [sales_order, manufacturer_id, date_ordered, date_received],
    (error, results) => {
      if (error) {
        response.status(500).send("Unable to create purchase order: \n  " + error.detail)
      } else {
        response.status(201).send(`Purchase Order added for manufacturer id ${manufacturer_id}.`)
      }
    }
  )
}

// readPurchaseOrder uses readRow

const updatePurchaseOrder = (request, response) => {
  var purchaseOrder
  pool.query(
    'SELECT * FROM purchase_orders WHERE id = $1',
    [request.params.id],
    (error, results) => {
      if (error) {
        throw error
      }
      if (results.rows.length === 1) {
        purchaseOrder = results.rows[0]
        let newPurchaseOrder = {...purchaseOrder, ...request.body}
        let sales_order = newPurchaseOrder.sales_order
        let manufacturer_id = newPurchaseOrder.manufacturer_id
        let date_ordered = newPurchaseOrder.date_ordered
        let date_received = newPurchaseOrder.date_received
        let id = newPurchaseOrder.id
        pool.query(
          'UPDATE purchase_orders SET sales_order = $1, manufacturer_id = $2, date_ordered = $3, date_received = $4 WHERE id = $5',
          [sales_order, manufacturer_id, date_ordered, date_received],
          (error, results) => {
            if (error) {
              throw error
            }
            response.send(`updated purchase_order ${id}`)
          }
        )
      }
    }
  )
}

// deletePurchaseOrder uses deleteRow
// listPurchaseOrders uses listRows

const createSalesOrder = (request, response) => {
  let user_id = request.body.user_id
  let customer_id = request.body.customer_id
  let item_id = request.body.item_id
  let qty = request.body.qty
  let date_ordered = request.body.date_ordered
  let date_received = request.body.date_received
  pool.query(
    `INSERT INTO sales_orders (user_id, customer_id, item_id, qty, date_ordered, date_received) VALUES ($1, $2, $3, $4, $5, $6)`, 
    [user_id, customer_id, item_id, qty, date_ordered, date_received],
    (error, results) => {
      if (error) {
        response.status(500).send("Unable to create sales order: \n  " + error.detail)
      } else {
        response.status(201).send(`Sales Order added for customer id ${customer_id}.`)
      }
    }
  )
}

// readSalesOrder uses readRow

const updateSalesOrder = (request, response) => {
  var salesOrder
  pool.query(
    'SELECT * FROM sales_orders WHERE id = $1',
    [request.params.id],
    (error, results) => {
      if (error) {
        throw error
      }
      if (results.rows.length === 1) {
        salesOrder = results.rows[0]
        let newSalesOrder = {...salesOrder, ...request.body}
        let user_id = newSalesOrder.user_id
        let customer_id = newSalesOrder.customer_id
        let item_id = newSalesOrder.item_id
        let qty = newSalesOrder.qty
        let date_ordered = newSalesOrder.date_ordered
        let date_received = newSalesOrder.date_received
        let id = newSalesOrder.id
        pool.query(
          'UPDATE sales_orders SET user_id = $1, customer_id = $2, item_id = $3, qty = $4, date_ordered = $5, date_received = $6 WHERE id = $7',
          [user_id, customer_id, item_id, qty, date_ordered, date_received, id],
          (error, results) => {
            if (error) {
              throw error
            }
            response.send(`updated sales_order ${id}`)
          }
        )
      }
    }
  )
}

// deleteSalesOrder uses deleteRow
// listSalesOrders uses listRows

module.exports = {
  readRow,
  deleteRow,
  listRows,
  createUser,
  updateUser,
  createItem,
  updateItem,
  createCompany,
  updateCompany,
  createPurchaseOrder,
  updatePurchaseOrder,
  createSalesOrder,
  updateSalesOrder,
}