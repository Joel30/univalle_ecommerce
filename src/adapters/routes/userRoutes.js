const { Router }     = require('express');
const UserController = require('../controllers/UserController');
 
module.exports = (signUpUseCase) => {
  const router = Router();
  const controller = new UserController(signUpUseCase);
 
  /**
   * @swagger
   * tags:
   *   name: Users
   *   description: Gestión de usuarios
   */

  /**
   * @swagger
   * /api/v1/users:
   *   post:
   *     summary: Registrar nuevo usuario
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       201:
   *         description: Usuario creado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 user:
   *                   $ref: '#/components/schemas/User'
   *       400:
   *         description: Datos de usuario inválidos
   */
  router.post('/', controller.signUp.bind(controller));

  return router;
};