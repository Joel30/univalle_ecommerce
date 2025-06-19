const CouponRepository = require('../../domain/repositories/CouponRepository');
const CouponModel = require('../database/models/CouponModel');
const Coupon = require('../../domain/entities/Coupon');

class MongoCouponRepository extends CouponRepository {
  async getAll() {
    const coupons = await CouponModel.find();
    return coupons.map(p => new Coupon(p.toObject()));
  }

  async create(coupon) {
    const newCoupon = await CouponModel.create(coupon);
    console.log('Coupon created:', newCoupon);
    
    return new Coupon(newCoupon.toObject());
  }
}

module.exports = MongoCouponRepository;