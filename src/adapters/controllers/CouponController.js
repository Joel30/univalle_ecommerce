const CreateCoupon = require('../../application/useCases/CreateCoupon');
const CouponDTO = require('../../application/dtos/CouponDTO');
 
class CouponController {
  constructor(couponRepository) {
    this.couponRepository = couponRepository;
    this.createCoupon = new CreateCoupon(couponRepository);
  }
 
  async create(req, res) {
    try {
      const coupon = await this.createCoupon.execute(req.body);
      res.status(201).json(new CouponDTO(coupon));
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const coupons = await this.couponRepository.getAll();
      res.status(200).json(coupons);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving coupons'});
    }
  }
}
 
module.exports = CouponController;