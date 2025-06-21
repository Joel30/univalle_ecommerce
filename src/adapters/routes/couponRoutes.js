const express = require('express');
const { authorizeRole } = require('../middlewares/authRole');

module.exports = (couponController) => {
  const router = express.Router();

  /**
   * @swagger
   * tags:
   *   name: Coupons
   *   description: Gestión de cupones de descuento
   */

  /**
   * @swagger
   * /api/v1/coupons:
   *   get:
   *     summary: Obtener todos los cupones
   *     tags: [Coupons]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de cupones
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Coupon'
   *       500:
   *         description: Error al obtener los cupones
   */
  router.get('/', (req, res) => couponController.getAll(req, res));

  /**
   * @swagger
   * /api/v1/coupons:
   *   post:
   *     summary: Crear un nuevo cupón (solo admin)
   *     tags: [Coupons]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       description: Datos para crear un cupón
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CouponCreateRequest'
   *     responses:
   *       201:
   *         description: Cupón creado correctamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Coupon'
   *       400:
   *         description: Error en la creación del cupón
   *       403:
   *         description: No autorizado (falta rol admin)
   */
  router.post('/', authorizeRole('admin'), (req, res) => couponController.create(req, res));

  return router;
};