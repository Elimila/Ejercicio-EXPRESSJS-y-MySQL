const db = require('../config/database')

const CategoryController = {
  // Obtener todas las categorías
  getAll(req, res) {
    const sql = 'SELECT * FROM categories'
    db.query(sql, (err, result) => {
      if (err) throw err
      res.send(result)
    })
  },

  // Crear una nueva categoría
  create(req, res) {
    const { name } = req.body
    const sql = 'INSERT INTO categories (name) VALUES (?)'
    db.query(sql, [name], (err, result) => {
      if (err) throw err
      res.send('Categoría creada con éxito 📦')
    })
  }
}

module.exports = CategoryController
