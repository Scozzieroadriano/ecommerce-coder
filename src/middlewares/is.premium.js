import jwt from "jsonwebtoken";
import UserMongoDao from "../daos/mongodb/users/user.dao.js";
import ProductService from "../services/products/product.services.js";
import 'dotenv/config';
const userDao = new UserMongoDao();
const productServices = new ProductService();
const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

export default async function isPremium(req, res, next) {
    try {
        // TOMO EL TOKEN DESDE LA COOKIE, SI NO EXISTE LO TOMO DESDE EL HEADER
        const AuthHeader = req.cookies.token || req.get("Authorization").split(" ")[1]
        
        if (!AuthHeader) {
            return res.status(401).json({ message: "Unauthorized" });
        } else {
            const token = AuthHeader;
            const decode = jwt.verify(token, SECRET_KEY_JWT);
            const user = await userDao.getById(decode.id);
            const idProduct = req.params.id;
        
            if (user.role === "premium" && idProduct) {
                const product = await productServices.getById(idProduct.toString());
                if (user.email === product.owner) {
                    req.user = user;
                    next(); // si el usuario es el propietario del producto
                } else {
                    return res.status(402).json({ message: "El producto solo puede ser modificado por el usuario creador" });
                }
            } else if (user.role === "admin" || user.role === "premium") {
                req.user = user;
                next(); // si el usuario es un administrador o premium
            } else {
                return res.status(401).json({ message: "Su rol no permite realizar esta operación" });
            }
        }
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}