const express = require('express');
const router = express.Router();

module.exports = (OrderController) => {
  /**
   * @swagger
   * tags:
   *   name: Orders
   *   description: Gestión de órdenes de compra
   */

  /**
   * @swagger
   * /api/v1/order:
   *   get:
   *     summary: Obtener todas las órdenes
   *     tags: [Orders]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de órdenes
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Order'
   *       500:
   *         description: Error al obtener las órdenes
   */
  router.get('/', (req, res) => OrderController.getAll(req, res));

  /**
   * @swagger
   * /api/v1/order:
   *   post:
   *     summary: Crear una nueva orden
   *     tags: [Orders]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/OrderCreateRequest'
   *     responses:
   *       201:
   *         description: Orden creada correctamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Order'
   *       400:
   *         description: Error al crear la orden
   */
  router.post('/', (req, res) => OrderController.create(req, res));

  return router;
};