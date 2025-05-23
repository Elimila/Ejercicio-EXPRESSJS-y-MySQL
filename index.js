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

app.get('/products', (req, res) => {
  const sql = 'SELECT * FROM products'
  db.query(sql, (err, result) => {
    if (err) throw err
    res.send(result)
  })
})

app.get('/categories', (req, res) => {
  const sql = 'SELECT * FROM categories'
  db.query(sql, (err, result) => {
    if (err) throw err
    res.send(result)
  })
})


app.listen(3000, () => {
  console.log('Server running on port 3000')
})