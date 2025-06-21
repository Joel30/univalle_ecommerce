const { Router } = require('express');
const AuthController = require('../controllers/AuthController');

module.exports = (signInUseCase) => {
  const router = Router();
  const controller = new AuthController(signInUseCase);

  /**
   * @swagger
   * tags:
   *   name: Authentication
   *   description: Endpoints de autenticación
   */

  /**
   * @swagger
   * /api/v1/auth/signin:
   *   post:
   *     summary: Iniciar sesión
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/LoginRequest'
   *     responses:
   *       200:
   *         description: Login exitoso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/AuthResponse'
   *       401:
   *         description: Credenciales inválidas
   */
  router.post('/signin', controller.signIn.bind(controller));

  /**
   * @swagger
   * /api/v1/auth/refresh:
   *   post:
   *     summary: Obtener un nuevo access token mediante refresh token
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RefreshTokenRequest'
   *     responses:
   *       200:
   *         description: Token renovado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/RefreshTokenResponse'
   *       400:
   *         description: Token de refresco no proporcionado
   *       401:
   *         description: Token inválido o expirado
   */
  router.post('/refresh', controller.refreshToken.bind(controller));

  return router;
};