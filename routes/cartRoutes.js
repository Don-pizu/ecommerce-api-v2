// routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const { createCart, getCart, updateCart, deleteCart } = require('../controllers/cartController');
const { protect, protectRoles } =require('../middleware/authMiddleware');


router.post('/cart/add', protect, createCart);
router.get('/cart', protect, getCart);
router.patch('/cart/:id', protect, updateCart);       // :id = productId in cart
router.delete('/cart/remove/:id', protect, deleteCart); //// :id optional (remove item or clear all)


module.exports = router;
