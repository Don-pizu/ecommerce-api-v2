//controller/orderController.js

const Order = require('../models/order');
const Cart = require('../models/cart');
const Product = require('../models/product');
const { simulatePayment } = require('../utils/payment');


//POST  Create and order//checkout
exports.createOrder = async (req, res, next) => {
	try {

		//Validate cart
		const cart = await Cart.findOne({ user: req.user._id});
		if(!cart || cart.items.length === 0)
			return res.status(400).json({ message: 'Cart is empty'});


		// create items snapshot
	    const orderItems = cart.items.map(i => ({
	      product: i.product._id,
	      quantity: i.quantity,
	      priceAtPurchase: i.product.price
	    }));

		 const order = await Order.create({
	      user: req.user._id,
	      items: orderItems,
	      status: 'pending'
	    });

		// clear cart after order
   		await Cart.deleteOne({ user: req.user._id });

		res.status(200).json({
			message: 'Order placed successfully',
			order
		});


	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

//POST  Confirm order after payment
exports.confirmOrder = async (req, res, next) => {

	try {

		const { orderId } = req.body;
        if (!orderId) 
        	return res.status(400).json({ message: 'orderId required' });


		const order = await Order.findById(orderId).populate("items.product");
        if (!order) 
        	return res.status(404).json({ message: 'Order not found' });

	
		const success = simulatePayment();
		if (!success) {
	      order.status = 'failed';
	      await order.save();
	      return res.json({ message: 'Payment failed', order });
	    }


	     // verify stock again and deduct
	    for (const it of order.items) {
	      const prod = await Product.findById(it.product._id || it.product);
	      if (!prod) {
	        order.status = 'failed - product missing';
	        await order.save();
	        return res.status(400).json({ message: `Product ${it.product._id || it.product} not found` });
	      }
	      if (prod.stock < it.quantity) {
	        order.status = 'failed - insufficient stock';
	        await order.save();
	        return res.status(400).json({ message: `Not enough stock for product ${prod._id}` });
	      }
	    }

	    // deduct stock
	    for (const it of order.items) {
	      const prod = await Product.findById(it.product._id || it.product);
	      prod.stock = prod.stock - it.quantity;
	      await prod.save();
	    }

	    order.status = 'paid';
	    await order.save();

	  
		res.status(200).json({ 
			message: 'Order confirmation updated',
			order
		});

	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

//Get   Get all orders
exports.getOrder = async (req, res, next) => {
	try {
		const getOrder = await Order.find({ user: req.user._id })
												.populate("items.product");
  
  	 if (!getOrder) 
  	 	return res.status(404).json({ message: 'Order not found' });

  	res.json(getOrder);

	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};


//GET    Get order by Id
exports.getOrderById = async (req, res, next) => {
	try {
		const order = await Order.findById(req.params.id)
										.populate("items.product");

		if(!order)
			return res.status(404).json({ message: 'Order not found'});

		res.json({
			message: 'Order retrieved successfully',
			order
		});

	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};