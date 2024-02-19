import jwt from "jsonwebtoken";
import UserMongoDao from "../daos/mongodb/users/user.dao.js";
import 'dotenv/config';
const userDao = new UserMongoDao();
const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

export default async function verifyTokenPass(req, res, next) {
    try {
        // TOMO EL TOKEN DESDE LA COOKIE, SI NO EXISTE LO TOMO DESDE EL HEADER
        const AuthHeader = req.cookies.tokenpass || req.get("AuthorizationPass").split(" ")[1]
        if (!AuthHeader) {
            return res.status(401).json({ message: "Token Pass Expired" });
        } else {
            const token = AuthHeader;
            const decode = jwt.verify(token, SECRET_KEY_JWT);
            const user = await userDao.getById(decode.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            req.user = user;
            next();
        }
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}