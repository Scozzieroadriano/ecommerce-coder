import jwt from "jsonwebtoken";
import UserMongoDao from "../daos/mongodb/users/user.dao.js";
import 'dotenv/config';
const userDao = new UserMongoDao();
const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

export default async function verifyToken(req, res, next) {
    try {
        // TOMO EL TOKEN DESDE LA COOKIE, SI NO EXISTE LO TOMO DESDE EL HEADER
        const AuthHeader = req.cookies.token || req.get("Authorization").split(" ")[1]
        if (!AuthHeader) {
            return res.status(401).json({ message: "Unauthorized" });
        } else {
            const token = AuthHeader;
            const decode = jwt.verify(token, SECRET_KEY_JWT);
            const user = await userDao.getById(decode.id);
            if (!user) {
                return res.status(404).json({ message: "Unauthorized" });
            }
            const now = Math.floor(Date.now() / 1000);
            const tokenExp = decode.exp
            const timeUntilExp = tokenExp - now

            if (timeUntilExp <= 500){
                const newToken = await userDao.generateToken(user, '10m')
                //vuelvo a setear token en header y cookie
                res.set("Authorization", `Bearer ${newToken}`);
                res.cookie('token', newToken, { 
                    maxAge: 10 * 60 * 1000,
                    httpOnly: true });
            }
            req.user = user;
            next();
        }
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}