const express = require('express');
const router = express.Router();

const {
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/adminProductController');

const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

// ✅ Admin product routes
router.post('/products', protect, admin, createProduct);
router.put('/products/:id', protect, admin, updateProduct);
router.delete('/products/:id', protect, admin, deleteProduct);

module.exports = router;
