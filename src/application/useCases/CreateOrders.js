const Order = require('../../domain/entities/Order');
 
class CreateOrder {
  constructor(OrdersRepository) {
    this.OrdersRepository = OrdersRepository;
  }
 
  async execute(OrderData) {
    const order = new Order(OrderData);
    return await this.orderRepository.create(order);
  }
}
 
module.exports = CreateOrder;