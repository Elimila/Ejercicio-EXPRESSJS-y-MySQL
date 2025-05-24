const express = require('express')
const router = express.Router()

const CategoryController = require('../controllers/categoryController')

// Obtener todas las categorías
router.get('/', CategoryController.getAll)

// Crear una categoría
router.post('/', CategoryController.create)

module.exports = router

