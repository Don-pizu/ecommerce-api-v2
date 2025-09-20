//controllers/productController.js

const Product = require('../models/product.js');
const User = require('../models/User.js')

//POST Create a product
exports.createProduct = async (req, res, next) => {
	try {
		const { name, price, stock, description} = req.body;
		const user = req.user;

		//Validate products requirements
		 if (name == null || price == null || stock == null || !description)
			return res.status(400).json({ message: 'All the fields are required'});

		if(!user)
			return res.status(401).json({ message: 'User not authenticated'});

		//fetch user data
		const dbUser = await User.findById(user._id);
		if(!dbUser)
			return res.status(400).json({ message: 'User not found'});


		const product = await Product.create({
			user: dbUser._id,
			name,
			price,
			stock,
			description
		});

		res.status(201).json({
			message: 'Product created successfully',
			product
		});

	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};



//GET Get all products with pagination
exports.getAllProducts = async (req, res, next) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const skip =(page - 1) * limit;

		const filter = {};

		if (req.query.type) {
			filter.type = req.query.type;
		}

		if (req.query.start || req.query.end) {
			filter.createdAt = {};
		    if (req.query.start)
		    	filter.createdAt.$gte = new Date(req.query.start);
		    if (req.query.end)
		        filter.createdAt.$lte = new Date(req.query.end);
		}

		const getAllProducts = await Product.find(filter)
													.sort({ createdAt: -1 })
													.skip(skip)
													.limit(limit);

		const totalPro = await Product.countDocuments(filter);
		const totalPages = Math.ceil(totalPro / limit);

		res.json({
			getAllProducts,
			total: totalPro,
			page,
			totalPages

		});

	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};



//Get Get a product by ID

exports.getProductById = async (req, res, next) => {
	try {

		const product = await Product.findById(req.params.id);

		if(!product) 
			return res.status(404).json({ message: 'Product not found'});

		res.json({
			message: 'Here is the product',
			product
		});

	} catch (err){
		res.status(500).json({ message: err.message });
	}
};



//PATCH   Patch product by id
exports.patchProduct = async (req, res, next) => {
	try {

		const { name, price, stock, description } = req.body;

		//fetch user data
		const user = await User.findById(req.user._id);
		if(!user)
			return res.status(404).json({ message: 'User not found'});

		//Verify product
		const getProduct = await Product.findById(req.params.id);
		if (!getProduct)
			return  res.status(404).json({ message: 'Product not found'});

		if(name)
			getProduct.name = name;
		if(price)
			getProduct.price = price;
		if(stock != null)
			getProduct.stock = stock;
		if(description)
			getProduct.description = description;

		await getProduct.save();

		res.status(201).json({
			message: 'Product records updated successfully',
			getProduct
		});

	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};



//DELETE Delete product by id
exports.deleteProduct = async (req, res, next) => {
	try {

		const getProduct = await Product.findById(req.params.id);
		if(!getProduct)
			return res.status(404).json({ message: 'Product not found'});

		//Delete product using id
		await getProduct.deleteOne();
		res.status(200).json({ message: 'Product deleted successfully'});

	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};