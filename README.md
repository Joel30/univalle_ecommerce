## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu entorno de desarrollo:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) (gestor de paquetes de Node.js)
- [MongoDB](https://www.mongodb.com/) (base de datos NoSQL)

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local:

1. **Clona el repositorio:**

    ```bash
    git clone https://github.com/Joel30/univalle_ecommerce.git
    cd backen-ecommerce
    ```

2. **Instala las dependencias:**

    ```bash
    npm install
    ```

3. **Configura las variables de entorno:**

    - Crea un archivo `.env` en la raíz del proyecto.
    - Copia el contenido del archivo `.env.example` proporcionado en el repositorio.
    - Reemplaza los valores de las variables según tu configuración local. Por ejemplo:

    ```env
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/ecommerce
    JWT_SECRET=tu_clave_secreta
    JWT_REFRESH_SECRET=your_jwt_refresh_secret
    DB_TYPE=mongodb
    ```

4. **Inicia el servidor:**

    ```bash
    npm start
    ```

## Estructura del proyecto

El proyecto está organizado de la siguiente manera:
```
backen-ecommerce/
├── src
│   ├── adapters
│   │   ├── controllers
│   │   │   ├── AuthController.js
│   │   │   ├── CategoryController.js
│   │   │   ├── CouponController.js
│   │   │   ├── OrderController.js
│   │   │   ├── ProductController.js
│   │   │   ├── ShoppingCartController.js
│   │   │   └── UserController.js
│   │   ├── middlewares
│   │   │   ├── authJwt.js
│   │   │   └── authRole.js
│   │   └── routes
│   │       ├── authRoutes.js
│   │       ├── categoryRoutes.js
│   │       ├── couponRoutes.js
│   │       ├── orderRoutes.js
│   │       ├── productRoutes.js
│   │       ├── shoppingCartRoutes.js
│   │       └── userRoutes.js
│   ├── application
│   │   ├── dtos
│   │   │   ├── CategoryDTO.js
│   │   │   ├── CouponDTO.js
│   │   │   ├── OrderDTO.js
│   │   │   ├── ProductDTO.js
│   │   │   ├── ShoppingCartDTO.js
│   │   └── useCases
│   │       ├── CreateCategory.js
│   │       ├── CreateCoupon.js
│   │       ├── CreateOrder.js
│   │       ├── CreateProduct.js
│   │       ├── CreateShoppingCart.js
│   │       ├── SignIn.js
│   │       └── SignUp.js
│   ├── config
│   │   └── index.js
│   ├── domain
│   │   ├── entities
│   │   │   ├── Category.js
│   │   │   ├── Coupon.js
│   │   │   ├── Order.js
│   │   │   ├── Product.js
│   │   │   ├── ShoppingCart.js
│   │   │   └── User.js
│   │   └── repositories
│   │       ├── CategoryRepository.js
│   │       ├── CouponRepository.js
│   │       ├── OrderRepository.js
│   │       ├── ProductRepository.js
│   │       ├── ShoppingCartRepository.js
│   │       └── UserRepository.js
│   ├── infraestructure
│   │   ├── database
│   │   │   ├── models
│   │   │   │   ├── CategoryModel.js
│   │   │   │   ├── CouponModel.js
│   │   │   │   ├── OrderModel.js
│   │   │   │   ├── ProductModel.js
│   │   │   │   ├── ShoppingCartModel.js
│   │   │   │   └── User.js
│   │   │   ├── mongoose.js
│   │   │   └── mysqlConnection.js
│   │   ├── docs
│   │   │   └── swaggerConfig.js
│   │   ├── repositories
│   │   │   ├── MongoCategoryRepository.js
│   │   │   ├── MongoCouponRepository.js
│   │   │   ├── MongoOrderRepository.js
│   │   │   ├── MongoProductRepository.js
│   │   │   ├── MongoShoppingCartRepository.js
│   │   │   ├── MongoUserRepository.js
│   │   │   └── MySQLProductRepository.js
│   │   └── services
│   │       ├── PasswordHasher.js
│   │       └── TokenGenerator.js
│   └── index.js
├── package-lock.json
├── package.json
└── README.md
```

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework web para Node.js.
- **MongoDB**: Base de datos NoSQL para almacenar la información de la aplicación.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB y Node.js.
- **JWT (JSON Web Tokens)**: Para la autenticación y autorización de usuarios.
- **dotenv**: Para manejar variables de entorno.



## Ultima actualización del proyecto

- Se agregó el campo stock a productos
    ```JAVASCRIPT
    // src/domain/entities/Product.js
    class Product {
        constructor({ name, description, price, stock, category, imageUrl }) {
            this.name = name;
            this.description = description;
            this.price = price;
            this.stock = stock; // añadiendo campo stock
            this.category = category;
            this.imageUrl = imageUrl;
        }
    }       
    module.exports = Product;
    ```
- Se actualizó un validar para que solo rol “admin” pueda crear productos
    ```JAVASCRIPT
        // src/index.js
        const { verifyToken } = require('./adapters/middlewares/authJwt');
        // src/adapters/middlewares/authJwt.js
        if (token === MAGIC_TOKEN) {
            req.userId = 'admin';
            req.userRoles = ['admin'];
            return next();
        }
                
    ```
- Se añaden las inteidades "Order" y "Cupons":
    * Order + casos de uso y endpoints:
      - src/adapters/controllers/OrderController.js
      - src/adapters/routes/orderRoutes.js
      - src/application/dtos/OrderDTO.js
      - src/application/useCases/CreateOrder.js
      - src/domain/entities/Order.js
      - src/domain/repositories/OrderRepository.js

    * Cupons + casos de uso y endpoints:
      - src/adapters/controllers/CouponController.js
      - src/adapters/routes/couponRoutes.js
      - src/application/dtos/CouponDTO.js
      - src/application/useCases/CreateCoupon.js
      - src/domain/entities/Coupon.js
      - src/domain/repositories/CouponRepository.js
    ```JAVASCRIPT
        // src/index.js
        const CouponController = require('./adapters/controllers/CouponController');
        const OrderController = require('./adapters/controllers/OrderController');
        
        const couponRoutes = require('./adapters/routes/couponRoutes');
        const orderRoutes = require('./adapters/routes/orderRoutes');

        const couponController = new CouponController(couponRepository);
        const orderController = new OrderController(orderRepository);
    ```

- Se actualizó la documentación de "Order", "Cupons" y de todos sus endpoints.