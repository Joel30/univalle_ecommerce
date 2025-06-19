const CreateOrder = require('../../application/useCases/Order');
const OrderDTO = require('../../application/dtos/OrderDTO');
 
class OrderController {
  constructor(OrderRepository) {
    this.OrderRepository = OrderRepository;
    this.createOrder = new CreateOrder(OrderRepository);
  }
 
  async create(req, res) {
    try {
      const cart = await this.createOrder.execute(req.body);
      res.status(201).json(new OrderDTO(cart));
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const carts = await this.OrderRepository.getAll();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving shopping carts' });
    }
  }
}
 
module.exports = OrderController;
