//models/product.js

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  user: {                           // reference to User
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {                           //product name
    type: String, 
    required: true,
    unique: true 
  },
  price: {                          // product price
    type: Number, 
    required: true 
  },
  stock: {                          // Number of products in stock
    type: Number, 
    default: 0 
  },
  description: {                    //product description
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
