// routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const { createOrder, confirmOrder, getOrder, getOrderById } = require('../controllers/orderController');
const { protect, protectRoles } =require('../middleware/authMiddleware');


router.post("/orders/checkout", protect, createOrder);
router.post("/orders/confirm", protect, confirmOrder);
router.get("/orders", protect, getOrder);
router.get("/orders/:id", protect, getOrderById);


module.exports = router;
