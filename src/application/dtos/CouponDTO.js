class CouponDTO {
  constructor(coupon) {
    this.id = coupon._id;
    this.code = coupon.code;
    this.percentage = coupon.percentage;
    this.expirationDate = coupon.expirationDate;
    this.conditions = coupon.conditions;
  }
}
 
module.exports = CouponDTO;