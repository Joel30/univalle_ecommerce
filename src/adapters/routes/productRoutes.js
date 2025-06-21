const express = require('express');
const { authorizeRole } = require('../middlewares/authRole');

module.exports = (productController) => {
  const router = express.Router();

  /**
   * @swagger
   * tags:
   *   name: Products
   *   description: Gestión de productos
   */

  /**
   * @swagger
   * /api/v1/products:
   *   get:
   *     summary: Obtener todos los productos
   *     tags: [Products]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de productos
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Product'
   *       500:
   *         description: Error al obtener los productos
   */
  router.get('/', (req, res) => productController.getAll(req, res));

  /**
   * @swagger
   * /api/v1/products:
   *   post:
   *     summary: Crear un nuevo producto (solo admin)
   *     tags: [Products]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       description: Datos para crear un producto
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ProductCreateRequest'
   *     responses:
   *       201:
   *         description: Producto creado correctamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   *       400:
   *         description: Error en la creación del producto
   *       403:
   *         description: No autorizado (falta rol admin)
   */
  router.post('/', authorizeRole('admin'), (req, res) => productController.create(req, res));

  return router;
};