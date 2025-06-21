const OrderRepository = require('../../domain/repositories/OrderRepository');
const OrderModel = require('../database/models/OrderModel');
const Order = require('../../domain/entities/Order');

class MongoOrderRepository extends OrderRepository {
  async getAll() {
    const orders = await OrderModel.find();
    return orders.map(p => new Order(p.toObject()));
  }

  async create(order) {
    const newOrder = await OrderModel.create(order);
    return new Order(newOrder.toObject());
  }
}

module.exports = MongoOrderRepository;