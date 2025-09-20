//models/order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema ({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	items: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product'
			},
			quantity: {
				type: Number,
				default: 1
			}
		}
	],
	status: {
		type: String,
		enum: ['pending', 'paid', 'failed'],
		default: 'pending'
	}
}, {timestamps: true});

module.exports = mongoose.model("Order", orderSchema);
