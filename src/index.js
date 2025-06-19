const express = require('express');
const config = require('./config')

const MongoProductRepository = require('./infraestructure/repositories/MongoProductRepository');
const MongoCategoryRepository = require('./infraestructure/repositories/MongoCategoryRepository');
const MongoShoppingCartRepository = require('./infraestructure/repositories/MongoShoppingCartRepository');
const MySQLProductRepository = require('./infraestructure/repositories/MySQLProductRepository');
//new
const MongoCouponRepository = require('./infraestructure/repositories/MongoCouponRepository');
const MongoOrderRepository = require('./infraestructure/repositories/MongoOrderRepository');


const ProductController = require('./adapters/controllers/ProductController');
const CategoryController = require('./adapters/controllers/CategoryController');
const ShoppingCartController = require('./adapters/controllers/ShoppingCartController');

const CouponController = require('./adapters/controllers/CouponController');
const OrderController = require('./adapters/controllers/OrderController');

const productRoutes = require('./adapters/routes/productRoutes');
const categoryRoutes = require('./adapters/routes/categoryRoutes');x
const shoppingCartRoutes = require('./adapters/routes/shoppingCartRoutes');
const couponRoutes = require('./adapters/routes/couponRoutes');
const orderRoutes = require('./adapters/routes/orderRoutes');
const { verifyToken } = require('./adapters/middlewares/authJwt');

const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./infraestructure/docs/swaggerConfig');
const MongoUserRepository = require('./infraestructure/repositories/MongoUserRepository');
const PasswordHasher = require('./infraestructure/services/PasswordHasher');
const TokenGenerator = require('./infraestructure/services/TokenGenerator');
const SignIn = require('./application/useCases/SignIn');
const authRoutes = require('./adapters/routes/authRoutes');
const userRoutes = require('./adapters/routes/userRoutes');
const SignUp = require('./application/useCases/SignUp');

const app = express();
const port = config.port;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Dependencies
const dbType = config.DB_TYPE;
let productRepository;
let categoryRepository;
let shoppingCartRepository;
let couponRepository;
let orderRepository;
if (dbType === 'mysql') {
  productRepository = new MySQLProductRepository();
} else {
  productRepository = new MongoProductRepository();
  categoryRepository = new MongoCategoryRepository();
  shoppingCartRepository = new MongoShoppingCartRepository();
  couponRepository = new MongoCouponRepository();
  orderRepository = new MongoOrderRepository();
}

// —– SETUP AUTH —–
const userRepo       = new MongoUserRepository();
const passwordHasher = new PasswordHasher();
const tokenGen       = new TokenGenerator();
const signInUseCase  = new SignIn(userRepo, passwordHasher, tokenGen);
app.use('/api/v1/auth', authRoutes(signInUseCase));
 
// ——— SETUP SIGNUP ———
const signUpUseCase = new SignUp(userRepo, passwordHasher);
app.use('/api/v1/users',express.json(),userRoutes(signUpUseCase));

const productController = new ProductController(productRepository);
const categoryController = new CategoryController(categoryRepository);
const shoppingCartController = new ShoppingCartController(shoppingCartRepository);
const couponController = new CouponController(couponRepository);
const orderController = new OrderController(orderRepository);
// Configuración de Swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
 
// Routes
app.use('/api/v1/products', verifyToken, productRoutes(productController));
app.use('/api/v1/categories', verifyToken, categoryRoutes(categoryController));
app.use('/api/v1/shopping-cart', verifyToken, shoppingCartRoutes(shoppingCartController));
app.use('/api/v1/coupons', verifyToken, couponRoutes(couponController));
app.use('/api/v1/order', verifyToken, shoppingCartRoutes(orderController));
 
// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server!' });
});
 
// Start Server
app.listen(port, () => {
  console.log(`E-commerce server running on port ${port}`);
});