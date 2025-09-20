//controller/cartController.js

const Cart = require('../models/cart');
const Product = require('../models/product');


//POST  Create or Add to cart
exports.createCart = async (req, res, next) => {
	try {
		const { productId, quantity } = req.body;
		const user = req.user;

		if(!productId || quantity == null)
			return res.status(400).json({ message: 'Product ID and quantity are required'});

		const product = await Product.findById(productId);
		if(!product || product.stock < quantity)
			return res.status(400).json({ message: 'Not enough stock'});

		//Find cart related to the user
		let cart = await Cart.findOne({ user: req.user._id});

		//Create cart if non
		if(!cart) {
			cart = await Cart.create({
				user: user._id,
				items: [ { product: productId, quantity } ]
			});
		} else {

			// Check if product already exists in cart
     		const itemIndex = cart.items.findIndex(i => i.product.toString() === productId);

     		if (itemIndex > -1) {
		        cart.items[itemIndex].quantity += quantity; // update quantity
		    } else {
		        cart.items.push({ product: productId, quantity });
		    }
		    
		    await cart.save();

		}


		res.status(201).json({
			message: 'Cart added successfully',
			cart
		})


	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}



//GET  Get cart relating to the req user
exports.getCart = async (req, res, next) => {

	try {
		const getCart = await Cart.findOne({ user: req.user._id })
											.populate('items.product');

		 if (!getCart) {
	      return res.json({ items: [] });
	    }

		res.json( getCart );

	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};


//Update Update cart
exports.updateCart = async (req, res, next) => {
	try {


		const {quantity} = req.body
		const { id } = req.params; // productId in cart

		const getCart = await Cart.findOne({ user: req.user._id });

		if(!getCart)
			return res.status(404).json({ message: 'Cart not found'});

		//Check if product exist in cart
		const itemIndex = getCart.items.findIndex(i => i.product.toString() === id);
		if(itemIndex === -1)
			return res.status(404).json({ message: 'Product not in cart' });

		if (quantity <= 0) {
      		getCart.items.splice(itemIndex, 1); // remove item if quantity <= 0
    	} else {
      		getCart.items[itemIndex].quantity = quantity;
   		}

		await getCart.save();

		res.json({
			message: 'Cart updated successfully',
			getCart
		});

	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};


//DELETE Delete cart
exports.deleteCart = async (req, res, next ) => {
	try {
		const { id } = req.params; // productId in cart

		const getCart = await Cart.findOne({user: req.user._id});
		if(!getCart)
			return res.status(404).json({ message: 'Cart not found'});

		if (id) {
	      // remove specific item
	      getCart.items = getCart.items.filter(i => i.product.toString() !== id);
	      await getCart.save();
	    } else {
	      // clear whole cart
	      await Cart.deleteOne({ user: req.user._id });
	    }

		res.status(200).json({ message: 'Cart deleted successfully'});

	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};