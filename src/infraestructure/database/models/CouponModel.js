const mongoose = require('../mongoose');
 
const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, trim: true },
  percentage: { type: Number, required: true, min: 0, max: 100 },
  expirationDate: { type: Date, required: true },
  conditions: { type: String, required: true, trim: true},
}, { timestamps: true });
 
module.exports = mongoose.model('Coupon', couponSchema);