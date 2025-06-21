const express = require('express');
const router = express.Router();

module.exports = (categoryController) => {
  /**
   * @swagger
   * tags:
   *   name: Categories
   *   description: Gestión de categorías de productos
   */

  /**
   * @swagger
   * /api/v1/categories:
   *   get:
   *     summary: Obtener todas las categorías
   *     tags: [Categories]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de categorías
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Category'
   *       500:
   *         description: Error al obtener las categorías
   */
  router.get('/', (req, res) => categoryController.getAll(req, res));

  /**
   * @swagger
   * /api/v1/categories:
   *   post:
   *     summary: Crear una nueva categoría
   *     tags: [Categories]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       description: Datos para crear una categoría
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CategoryCreateRequest'
   *     responses:
   *       201:
   *         description: Categoría creada correctamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Category'
   *       400:
   *         description: Error en la creación de la categoría
   */
  router.post('/', (req, res) => categoryController.create(req, res));

  return router;
};