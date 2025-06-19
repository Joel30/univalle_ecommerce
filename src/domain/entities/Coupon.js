class Coupon {
  constructor({ code, percentage, expirationDate, conditions }) {
    this.code = code;
    this.percentage = percentage;
    this.expirationDate = expirationDate;
    this.conditions = conditions;
  }
}
 
module.exports = Coupon;
 