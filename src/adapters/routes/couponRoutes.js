const express = require('express');
const { authorizeRole } = require('../middlewares/authRole');
const router = express.Router();
 
module.exports = (couponController) => {
  router.get('/', (req, res) => couponController.getAll(req, res));
  router.post('/', authorizeRole('admin'), (req, res) => couponController.create(req, res));
  return router;
};