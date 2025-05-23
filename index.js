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


app.listen(3000, () => {
  console.log('Server running on port 3000')
})