import jwt from "jsonwebtoken";
import UserMongoDao from "../daos/mongodb/users/user.dao.js";
import ProductService from "../services/products/product.services.js";
import 'dotenv/config';
const userDao = new UserMongoDao();
const productService = new ProductService()
const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

export default async function verifyCart(req, res, next) {
    try {
        const { id, pId } = req.params
        // TOMO EL TOKEN DESDE LA COOKIE, SI NO EXISTE LO TOMO DESDE EL HEADER
        const AuthHeader = req.cookies.token || req.get("Authorization").split(" ")[1]
        if (!AuthHeader) {
            return res.status(401).json({ message: "Unauthorized" });
        } else {
            const token = AuthHeader;
            const decode = jwt.verify(token, SECRET_KEY_JWT);
            const user = await userDao.getById(decode.id);
            const product = await productService.getById(pId);
            if (String(user.cart) === id) {
                if (user.role === "premium" && user.email === product.owner) {
                    return res.status(401).json({ message: "No puede agregar productos propios al carrito" });
                } else {
                    next();
                }
            } else {
                return res.status(404).json({ message: "El carrito no pertenece al usuario logeado" });
            }
        }
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}