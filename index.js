const express = require("express")
const app = express()
const mysql = require('mysql2')
app.use(express.json())

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345',
  database : 'expressSqlDB'

})

db.connect()

// Ejercicio1 

app.get('/createdb', (req, res) => {
 const sql = 'CREATE DATABASE expressSqlDB'

 db.query(sql, (err, result) => {
   if (err) throw err
   console.log(result)
   res.send('Database created...')
 })
})

app.get('/createTableProducts', (req, res) => {
 const sql =
   'CREATE TABLE products(id int AUTO_INCREMENT,name VARCHAR(255), type VARCHAR(50), quantity INT, precio FLOAT,  PRIMARY KEY(id))'
 db.query(sql, (err, result) => {
   if (err) throw err
   console.log(result)
   res.send('Tabla products creada...')
 })
})


app.get('/createTableCategories', (req, res) => {
 const sql =
   'CREATE TABLE categories(id INT AUTO_INCREMENT,name VARCHAR(255), PRIMARY KEY(id))'
 db.query(sql, (err, result) => {
   if (err) throw err
   res.send('Tabla categories creada...')
 })
})

// Ejercicio 2

app.post('/addProduct', (req, res) => {
  const { name, type, quantity, precio } = req.body
  const sql = 'INSERT INTO products (name, type, quantity, precio) VALUES (?, ?, ?, ?)'
  db.query(sql, [name, type, quantity, precio], (err, result) => {
    if (err) throw err
    res.send('Producto añadido')
  })
})

app.post('/addCategory', (req, res) => {
  const { name } = req.body
  const sql = 'INSERT INTO categories (name) VALUES (?)'
  db.query(sql, [name], (err, result) => {
    if (err) throw err
    res.send('Categoría añadida')
  })
})



// Ejercicio 3

app.put('/updateProduct/:id', (req, res) => {
  const { name, type, quantity, precio } = req.body
  const id = req.params.id

  const sql = `
    UPDATE products 
    SET name = ?, type = ?, quantity = ?, precio = ? 
    WHERE id = ?
  `

  db.query(sql, [name, type, quantity, precio, id], (err, result) => {
    if (err) throw err
    res.send('Producto actualizado')
  })
})

app.put('/updateCategory/:id', (req, res) => {
  const { name } = req.body
  const id = req.params.id

  const sql = 'UPDATE categories SET name = ? WHERE id = ?'

  db.query(sql, [name, id], (err, result) => {
    if (err) throw err
    res.send('Categoría actualizada')
  })
})


// Ejercicio 4



// Mostrar todos los productos
app.get('/products', (req, res) => {
  const sql = 'SELECT * FROM products'
  db.query(sql, (err, result) => {
    if (err) throw err
    res.send(result)
  })
})

// Mostrar todas las categorías
app.get('/categories', (req, res) => {
  const sql = 'SELECT * FROM categories'
  db.query(sql, (err, result) => {
    if (err) throw err
    res.send(result)
  })
})

// Mostrar productos con sus categorías 

// 1ero se Agrega columna category_id a la tabla products 
app.get('/addCategoryIdColumn', (req, res) => {
  const sql = 'ALTER TABLE products ADD category_id INT'
  db.query(sql, (err, result) => {
    if (err) throw err
    res.send('Columna category_id agregada a products')
  })
})

app.get('/products-with-categories', (req, res) => {
  const sql = `
    SELECT products.id, products.name AS product_name, products.type, products.quantity, products.precio,
           categories.name AS category_name
    FROM products
    LEFT JOIN categories ON products.category_id = categories.id
  `
  db.query(sql, (err, result) => {
    if (err) throw err
    res.send(result)
  })
})


// Mostrar producto por ID
app.get('/product/:id', (req, res) => {
  const { id } = req.params
  const sql = 'SELECT * FROM products WHERE id = ?'
  db.query(sql, [id], (err, result) => {
    if (err) throw err
    res.send(result)
  })
})

// Mostrar productos en orden descendente
app.get('/products-desc', (req, res) => {
  const sql = 'SELECT * FROM products ORDER BY id DESC'
  db.query(sql, (err, result) => {
    if (err) throw err
    res.send(result)
  })
})

// Mostrar categoría por ID
app.get('/category/:id', (req, res) => {
  const { id } = req.params
  const sql = 'SELECT * FROM categories WHERE id = ?'
  db.query(sql, [id], (err, result) => {
    if (err) throw err
    res.send(result)
  })
})

// Buscar producto por nombre
app.get('/searchProduct/:name', (req, res) => {
  const { name } = req.params
  const sql = 'SELECT * FROM products WHERE name LIKE ?'
  db.query(sql, [`%${name}%`], (err, result) => {
    if (err) throw err
    res.send(result)
  })
})

// Eliminar producto por ID
app.delete('/deleteProduct/:id', (req, res) => {
  const { id } = req.params
  const sql = 'DELETE FROM products WHERE id = ?'
  db.query(sql, [id], (err, result) => {
    if (err) throw err
    res.send('Producto eliminado')
  })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})