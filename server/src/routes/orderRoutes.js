// orderRoutes.js
const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
} = require('../controllers/orderController');

// Rutas del recurso /orders
router.post('/orders', createOrder);
router.get('/orders', getOrders);
router.get('/orders/:id', getOrderById);
router.patch('/orders/:id', updateOrder);

module.exports = router;
