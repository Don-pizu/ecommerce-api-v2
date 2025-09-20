//controller/orderController.js

const Order = require('../models/order');
const Cart = require('../models/cart');
const { simulatePayment } = require('../utils/payment');


//POST  Create and order//checkout
exports.createOrder = async (req, res, next) => {
	try {

		//Validate cart
		const cart = await Cart.findOne({ user: req.user._id});
		if(!cart || cart.items.length === 0)
			return res.status(400).json({ message: 'Cart is empty'});


		const order= await Order.create({
			user: req.user._id,
			items: cart.items
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
		const order = await Order.findById(req.body.orderId);
		if(!order)
			return res.status(404).json({ message: 'Order not found'});
	
		const success = simulatePayment();
		order.status = success ? 'paid' : 'failed';

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
			message: 'Here is the order',
			order
		});

	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};