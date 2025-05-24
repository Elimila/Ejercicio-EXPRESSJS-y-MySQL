const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/ProductController')

// Ruta para obtener todos los productos
router.get('/', ProductController.getAll)

// Ruta para crear un nuevo producto
router.post('/', ProductController.create)

module.exports = router
