// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming you have authentication

// Place a new order (requires authentication)
router.post('/', authMiddleware, orderController.placeOrder);

// Get all orders for the authenticated user
router.get('/my-orders', authMiddleware, orderController.getUserOrders);

// Get a specific order by ID (requires authentication and ownership check or admin access)
router.get('/:id', authMiddleware, orderController.getOrderDetail);

// Update order status (typically for admin users)
router.put('/:id/status', authMiddleware, authMiddleware.authorizeRoles('admin'), orderController.updateOrderStatus);

// Cancel an order (user can cancel their own, or admin can cancel any)
router.post('/:id/cancel', authMiddleware, orderController.cancelOrder);

module.exports = router;