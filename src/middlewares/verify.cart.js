import jwt from "jsonwebtoken";
import UserMongoDao from "../daos/mongodb/users/user.dao.js";
import 'dotenv/config';
const userDao = new UserMongoDao();
const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

export default async function verifyCart(req, res, next) {
    try {
        const { cartId } = req.params
        // TOMO EL TOKEN DESDE LA COOKIE, SI NO EXISTE LO TOMO DESDE EL HEADER
        const AuthHeader = req.cookies.token || req.get("Authorization").split(" ")[1]
        if (!AuthHeader) {
            return res.status(401).json({ message: "Unauthorized" });
        } else {
            const token = AuthHeader;
            const decode = jwt.verify(token, SECRET_KEY_JWT);
            const user = await userDao.getById(decode.id);
            if (user.cart.toString() === cartId) {
                next();
            } else { 
                return res.status(404).json({ message: "El carrito no pertenece al usuario logeado" });
        }
    }
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}