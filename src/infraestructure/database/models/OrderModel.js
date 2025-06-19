// models/OrderModel.js
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product',required: true,},
  quantity: {type: Number,required: true, min: 1, },
  priceAtTimeOfOrder: { type: Number, required: true,},// Store the price when the order was made
});

const orderSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true,}, 
  items: [orderItemSchema],
  totalAmount: {type: Number,required: true,},
  status: {type: String,
  enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentInfo: {
    method: { type: String, required: true }, // e.g., 'credit_card', 'paypal', 'cash_on_delivery'
    transactionId: { type: String }, // Optional, for external payment gateways    
  },
}, { timestamps: true }); 

module.exports = mongoose.model('Order', orderSchema);