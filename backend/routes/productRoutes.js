const express = require('express')
const router = express.Router()
const {
  getAllProducts,
  getProductById,
  getTopProducts,
} = require('../controllers/productController')

// ⚠️ ORDER IS IMPORTANT
router.get('/top', getTopProducts)
router.get('/', getAllProducts)
router.get('/:id', getProductById)

module.exports = router
