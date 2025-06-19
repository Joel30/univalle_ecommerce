const Coupon = require('../../domain/entities/Coupon');
 
class CreateCoupon {
  constructor(couponRepository) {
    this.couponRepository = couponRepository;
  }
 
  async execute(couponData) {
    const coupon = new Coupon(couponData);
    return await this.couponRepository.create(coupon);
  }
}
 
module.exports = CreateCoupon;