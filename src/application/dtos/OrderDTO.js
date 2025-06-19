class OrderDTO {
  constructor(cart) {
    this.id = cart._id;
    this.userID = cart.userID;
    this.items = cart.items;
    this.mount = cart.mount;
  }
}
 
module.exports = OrderDTO;