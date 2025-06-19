// controllers/orderController.js
const Order = require('../models/Order');
const Product = require('../models/Product'); // Assuming you have a Product model
const mongoose = require('mongoose');

// Process order item
async function processOrderItems(items, session) {
  for (const item of items) {
    const product = await Product.findById(item.productId).session(session);
    if (!product || product.stock < item.quantity) {
      throw new Error(`Insufficient stock for product: ${product ? product.name : item.productId}`);
    }
    product.stock -= item.quantity;
    await product.save({ session });
  }
}

//  increment stock for cancelled orders within a transaction
async function restoreOrderItems(items, session) {
  for (const item of items) {
    const product = await Product.findById(item.productId).session(session);
    if (product) {
      product.stock += item.quantity;
      await product.save({ session });
    }
  }
}

exports.placeOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { items, shippingAddress, paymentInfo } = req.body;
    const userId = req.user.id; // Assuming user ID is available from auth middleware

    // 1. Validate items and calculate total amount, checking current product prices
    let totalAmount = 0;
    const orderItemsWithPrices = [];
    for (const item of items) {
      const product = await Product.findById(item.productId).session(session);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found.`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for product ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`);
      }
      orderItemsWithPrices.push({
        productId: product._id,
        quantity: item.quantity,
        priceAtTimeOfOrder: product.price, // Store the price at the time of order
      });
      totalAmount += product.price * item.quantity;
    }

    // 2. Decrement stock for each product
    await processOrderItems(orderItemsWithPrices, session);

    // 3. Create the order
    const newOrder = new Order({
      userId,
      items: orderItemsWithPrices,
      totalAmount,
      shippingAddress,
      paymentInfo,
    });
    await newOrder.save({ session });

    await session.commitTransaction();
    res.status(201).json(newOrder);
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId }).populate('items.productId', 'name price'); // Populate product name and price
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const order = await Order.findOne({ _id: id, userId }).populate('items.productId', 'name price'); // Ensure user owns the order
    if (!order) {
      return res.status(404).json({ message: 'Order not found or you do not have permission to view it.' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id).session(session);
    if (!order) {
      throw new Error('Order not found.');
    }

    // Example of state transition logic (optional but good practice)
    if (order.status === 'cancelled' || order.status === 'delivered') {
      throw new Error(`Cannot change status of an order that is '${order.status}'.`);
    }

    order.status = status;
    await order.save({ session });

    await session.commitTransaction();
    res.json(order);
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

exports.cancelOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;
    const userId = req.user.id; // User canceling the order

    const order = await Order.findById(id).session(session);
    if (!order) {
      throw new Error('Order not found.');
    }

    // Allow user to cancel only their own order, and if it's in a cancellable status
    if (order.userId.toString() !== userId && req.user.role !== 'admin') { // Assuming user has a role property
      throw new Error('You do not have permission to cancel this order.');
    }

    if (['shipped', 'delivered', 'cancelled'].includes(order.status)) {
      throw new Error('Order cannot be cancelled in its current state.');
    }

    order.status = 'cancelled';
    await order.save({ session });

    // Restore stock
    await restoreOrderItems(order.items, session);

    await session.commitTransaction();
    res.json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ message: error.message });
  } finally {
    session.endSession();
  }
};