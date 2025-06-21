const swaggerJSDoc = require('swagger-jsdoc');
const config = require('../../config');
const port = config.port;
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'API para sistema de e-commerce con autenticación y gestión de productos',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Servidor local',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['username', 'email', 'password'],
          properties: {
            username: {
              type: 'string',
              description: 'Nombre de usuario'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Correo electrónico del usuario'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Contraseña del usuario'
            },
            roles: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Roles del usuario',
              default: ['user']
            }
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              description: 'Nombre de usuario',
              example: 'admin'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Contraseña del usuario',
              example: 'admin123'
            }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            user: {
              $ref: '#/components/schemas/User'
            },
            token: {
              type: 'string',
              description: 'JWT access token',
              example: 'eyJhbGciOiJIUzI1NiIsInR5...'
            },
            refreshToken: {
              type: 'string',
              description: 'Token de refresco',
              example: 'eyJhbGciOiJIUzI1NiIsInR5...'
            }
          }
        },

        RefreshTokenRequest: {
          type: 'object',
          required: ['refreshToken'],
          properties: {
            refreshToken: {
              type: 'string',
              description: 'Refresh token JWT',
              example: 'eyJhbGciOiJIUzI1NiIsInR5...'
            }
          }
        },
        RefreshTokenResponse: {
          type: 'object',
          properties: {
            accessToken: {
              type: 'string',
              description: 'Nuevo token de acceso',
              example: 'eyJhbGciOiJIUzI1NiIsInR5...'
            }
          }
        },

        Category: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID de la categoría',
              example: '60f5a3d7f1a4e62b5c8a7b92'
            },
            name: {
              type: 'string',
              description: 'Nombre de la categoría',
              example: 'Electrónica'
            },
            description: {
              type: 'string',
              description: 'Descripción de la categoría',
              example: 'Dispositivos electrónicos y gadgets'
            }
          }
        },
        CategoryCreateRequest: {
          type: 'object',
          required: ['name', 'description'],
          properties: {
            name: {
              type: 'string',
              description: 'Nombre de la categoría',
              example: 'Electrónica'
            },
            description: {
              type: 'string',
              description: 'Descripción de la categoría',
              example: 'Dispositivos electrónicos y gadgets'
            }
          }
        },

        Product: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID del producto',
              example: '60f5a3d7f1a4e62b5c8a7b91'
            },
            name: {
              type: 'string',
              description: 'Nombre del producto',
              example: 'Camiseta Oficial'
            },
            description: {
              type: 'string',
              description: 'Descripción del producto',
              example: 'Camiseta 100% algodón, talla M'
            },
            price: {
              type: 'number',
              description: 'Precio del producto',
              example: 19.99
            },
            stock: {
              type: 'number',
              description: 'Cantidad disponible en inventario',
              example: 100
            },
            category: {
              type: 'string',
              description: 'Categoría del producto',
              example: 'Ropa'
            },
            imageUrl: {
              type: 'string',
              description: 'URL de la imagen del producto',
              example: 'https://misitio.com/images/camiseta.jpg'
            }
          }
        },
        ProductCreateRequest: {
          type: 'object',
          required: ['name', 'description', 'price', 'stock', 'category'],
          properties: {
            name: {
              type: 'string',
              description: 'Nombre del producto',
              example: 'Camiseta Oficial'
            },
            description: {
              type: 'string',
              description: 'Descripción del producto',
              example: 'Camiseta 100% algodón, talla M'
            },
            price: {
              type: 'number',
              description: 'Precio del producto',
              example: 19.99
            },
            stock: {
              type: 'number',
              description: 'Cantidad disponible en inventario',
              example: 100
            },
            category: {
              type: 'string',
              description: 'Categoría del producto',
              example: 'Ropa'
            },
            imageUrl: {
              type: 'string',
              description: 'URL de la imagen del producto',
              example: 'https://misitio.com/images/camiseta.jpg'
            }
          }
        },

        ShoppingCart: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID del carrito',
              example: '60f5a3d7f1a4e62b5c8a7b93'
            },
            userID: {
              type: 'string',
              description: 'ID del usuario propietario del carrito',
              example: 'user_123'
            },
            items: {
              type: 'array',
              description: 'Lista de productos en el carrito',
              items: {
                type: 'object',
                properties: {
                  productId: {
                    type: 'string',
                    description: 'ID del producto',
                    example: 'prod_987'
                  },
                  quantity: {
                    type: 'integer',
                    description: 'Cantidad del producto',
                    example: 2
                  }
                },
                required: ['productId', 'quantity']
              }
            }
          }
        },
        ShoppingCartCreateRequest: {
          type: 'object',
          required: ['userID', 'items'],
          properties: {
            userID: {
              type: 'string',
              description: 'ID del usuario propietario del carrito',
              example: 'user_123'
            },
            items: {
              type: 'array',
              description: 'Lista de productos en el carrito',
              items: {
                type: 'object',
                properties: {
                  productId: {
                    type: 'string',
                    description: 'ID del producto',
                    example: 'prod_987'
                  },
                  quantity: {
                    type: 'integer',
                    description: 'Cantidad del producto',
                    example: 2
                  }
                },
                required: ['productId', 'quantity']
              }
            }
          }
        },

        Coupon: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID del cupón',
              example: '60f5a3d7f1a4e62b5c8a7b90'
            },
            code: {
              type: 'string',
              description: 'Código identificador del cupón',
              example: 'DESCUENTO10'
            },
            percentage: {
              type: 'number',
              description: 'Porcentaje de descuento aplicado',
              example: 10
            },
            expirationDate: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de expiración del cupón',
              example: '2025-12-31T23:59:59.000Z'
            },
            conditions: {
              type: 'string',
              description: 'Condiciones del cupón',
              example: 'Válido solo para compras mayores a $50'
            }
          }
        },
        CouponCreateRequest: {
          type: 'object',
          required: ['code', 'percentage', 'expirationDate', 'conditions'],
          properties: {
            code: {
              type: 'string',
              description: 'Código identificador del cupón',
              example: 'DESCUENTO10'
            },
            percentage: {
              type: 'number',
              description: 'Porcentaje de descuento aplicado',
              example: 10
            },
            expirationDate: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de expiración del cupón',
              example: '2025-12-31T23:59:59.000Z'
            },
            conditions: {
              type: 'string',
              description: 'Condiciones del cupón',
              example: 'Válido solo para compras mayores a $50'
            }
          }
        },

        Order: {
          type: 'object',
          properties: {
            userId: {
              type: 'string',
              description: 'ID del usuario que realizó la orden',
              example: '6488fdd41b67d10f9c3c7a31'
            },
            items: {
              type: 'array',
              description: 'Productos ordenados',
              items: { $ref: '#/components/schemas/OrderItem' }
            },
            totalAmount: {
              type: 'number',
              description: 'Total en la orden',
              example: 150.50
            },
            status: {
              type: 'string',
              enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
              description: 'Estado de la orden',
              example: 'pending'
            },
            shippingAddress: {
              $ref: '#/components/schemas/ShippingAddress'
            },
            paymentInfo: {
              $ref: '#/components/schemas/PaymentInfo'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        OrderCreateRequest: {
          type: 'object',
          required: ['userId', 'items', 'totalAmount', 'shippingAddress', 'paymentInfo'],
          properties: {
            userId: {
              type: 'string',
              description: 'ID del usuario que realiza la orden'
            },
            items: {
              type: 'array',
              description: 'Lista de productos con cantidad y precio',
              items: { $ref: '#/components/schemas/OrderItem' }
            },
            totalAmount: {
              type: 'number',
              description: 'Total en la orden'
            },
            shippingAddress: {
              $ref: '#/components/schemas/ShippingAddress'
            },
            paymentInfo: {
              $ref: '#/components/schemas/PaymentInfo'
            }
          }
        },
        OrderItem: {
          type: 'object',
          required: ['productId', 'quantity', 'priceAtTimeOfOrder'],
          properties: {
            productId: {
              type: 'string',
              description: 'ID del producto'
            },
            quantity: {
              type: 'integer',
              description: 'Cantidad comprada',
              example: 2
            },
            priceAtTimeOfOrder: {
              type: 'number',
              description: 'Precio al momento de la compra',
              example: 45.99
            }
          }
        },
        ShippingAddress: {
          type: 'object',
          required: ['street', 'city', 'state', 'zipCode', 'country'],
          properties: {
            street: { type: 'string', example: 'Av. Siempre Viva 123' },
            city: { type: 'string', example: 'Cochabamba' },
            state: { type: 'string', example: 'CBBA' },
            zipCode: { type: 'string', example: '1234' },
            country: { type: 'string', example: 'Bolivia' }
          }
        },
        PaymentInfo: {
          type: 'object',
          required: ['method'],
          properties: {
            method: {
              type: 'string',
              description: 'Método de pago',
              enum: ['credit_card', 'paypal', 'cash_on_delivery'],
              example: 'credit_card'
            },
            transactionId: {
              type: 'string',
              description: 'ID de la transacción (opcional para integraciones externas)',
              example: 'txn_001122'
            }
          }
        },
      },
    },
  },
  apis: ['./src/adapters/routes/*.js'],
};
 
module.exports = swaggerJSDoc(options);