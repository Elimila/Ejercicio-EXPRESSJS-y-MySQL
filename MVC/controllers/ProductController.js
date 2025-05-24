const db = require('../config/database')

const ProductController = {
  getAll(req, res) {
    const sql = 'SELECT * FROM products'
    db.query(sql, (err, result) => {
      if (err) throw err
      res.send(result)
    })
  },

  create(req, res) {
    const { name, type, quantity, precio, category_id } = req.body
    const sql = 'INSERT INTO products (name, type, quantity, precio, category_id) VALUES (?, ?, ?, ?, ?)'
    db.query(sql, [name, type, quantity, precio, category_id], (err, result) => {
      if (err) throw err
      res.send('Producto creado con éxito 🛒')
    })
  }
}

module.exports = ProductController
