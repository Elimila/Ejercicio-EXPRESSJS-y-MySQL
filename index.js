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

app.listen(3000, () => {
  console.log('Server running on port 3000')
})