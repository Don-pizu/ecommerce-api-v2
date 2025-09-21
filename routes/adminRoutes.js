// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const { getAllOrders, updateOrderStatus } = require('../controllers/adminOrderController');
const { protect, protectRoles } =require('../middleware/authMiddleware');


router.get('/admin/orders', protect, protectRoles('admin'), getAllOrders);
router.patch('/admin/orders/:id/status', protect, protectRoles('admin'), updateOrderStatus);


module.exports = router;
