const express = require('express');
const router = express.Router();

const {
  getAllOrders,
  markAsDelivered,
} = require('../controllers/adminOrderController');

const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

// ✅ ALL handlers are functions now
router.get('/orders', protect, admin, getAllOrders);
router.put('/orders/:id/deliver', protect, admin, markAsDelivered);

module.exports = router;
