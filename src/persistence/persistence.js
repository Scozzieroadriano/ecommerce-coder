import { ConnectMongoDB } from '../config/conection.js';
import 'dotenv/config';
import UserMongoDao from '../daos/mongodb/users/user.dao.js';
import ProductMongoDao from '../daos/mongodb/products/product.dao.js'
import CartMongoDao from '../daos/mongodb/carts/cart.dao.js'
const persistence = process.env.PERSISTENCE;

let userDao;
let productDao;
let cartDao;

if (persistence === 'MONGO') {
    ConnectMongoDB.getInstance();
    userDao = new UserMongoDao()
    productDao = new ProductMongoDao()
    cartDao = new CartMongoDao()
}
export default { userDao, productDao, cartDao };