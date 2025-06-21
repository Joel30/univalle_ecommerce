const express = require('express');
const router = express.Router();

module.exports = (shoppingCartController) => {
  /**
   * @swagger
   * tags:
   *   name: ShoppingCart
   *   description: Gestión de carritos de compra
   */

  /**
   * @swagger
   * /api/v1/shopping-cart:
   *   get:
   *     summary: Obtener todos los carritos de compra
   *     tags: [ShoppingCart]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de carritos de compra
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/ShoppingCart'
   *       500:
   *         description: Error al obtener los carritos
   */
  router.get('/', (req, res) => shoppingCartController.getAll(req, res));

  /**
   * @swagger
   * /api/v1/shopping-cart:
   *   post:
   *     summary: Crear un nuevo carrito de compra
   *     tags: [ShoppingCart]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       description: Datos para crear un carrito
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ShoppingCartCreateRequest'
   *     responses:
   *       201:
   *         description: Carrito creado correctamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ShoppingCart'
   *       400:
   *         description: Error en la creación del carrito
   */
  router.post('/', (req, res) => shoppingCartController.create(req, res));

  return router;
};