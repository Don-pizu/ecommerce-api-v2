// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, getProductById, patchProduct, deleteProduct } = require('../controllers/productController');
const { protect, protectRoles } =require('../middleware/authMiddleware');


router.post('/products', protect, protectRoles('admin'), createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.patch('/products/:id', protect, protectRoles('admin'), patchProduct);
router.delete('/products/:id', protect, protectRoles('admin'), deleteProduct);


module.exports = router;
