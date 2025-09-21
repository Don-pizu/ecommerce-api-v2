// utils/productValidation.js
const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  price: Joi.number().precision(2).min(0).required(),
  stock: Joi.number().integer().min(0).required(),
  description: Joi.string().allow('', null)
});

const updateProductSchema = Joi.object({
  name: Joi.string().min(2).max(255),
  price: Joi.number().precision(2).min(0),
  stock: Joi.number().integer().min(0),
  description: Joi.string().allow('', null)
}).min(1);

module.exports = { createProductSchema, updateProductSchema };
