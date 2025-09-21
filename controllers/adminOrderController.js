// controllers/adminOrderController.js
const Order = require('../models/order');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowed = ['pending', 'shipped', 'delivered'];
    if (!allowed.includes(status)) 
      return res.status(400).json({ message: 'Invalid status' });

    const order = await Order.findById(id);
    if (!order) 
      return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();
    await order.populate('items.product');

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
