const mysql = require('mysql2')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'TU_USUARIO',
  password: 'TU_CONTRASEÑA',
  database: 'NOMBRE_DE_LA_BD'
})

db.connect()

module.exports = db
