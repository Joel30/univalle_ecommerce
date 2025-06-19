class Order {
  constructor({ productId, quantity, priceAtTimeOfOrder }) {
    this.productId = productId;
    this.quantity = quantity;
    this.priceAtTimeOfOrder = priceAtTimeOfOrder;

  }
}
 
module.exports = Order;
 