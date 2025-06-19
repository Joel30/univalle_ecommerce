const express = require('express');
const router = express.Router();
 
module.exports = (OrderController) => {
  router.get('/', (req, res) => OrderController.getAll(req, res));
  router.post('/', (req, res) => OrderController.create(req, res));
  return router;
};

