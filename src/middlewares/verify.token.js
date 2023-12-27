import jwt from "jsonwebtoken";
import UserMongoDao from "../daos/mongodb/users/user.dao.js";
import 'dotenv/config';
const userDao = new UserMongoDao();
const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

export default async function verifyToken(req, res, next) {
    try {
        const AuthHeader = req.get("Authorization");
        if (!AuthHeader) {
            return res.status(401).json({ message: "Unauthorized" });
        } else {
            const token = AuthHeader.split(" ")[1];
            const decode = jwt.verify(token, SECRET_KEY_JWT);
            console.log(decode);
            const user = await userDao.getById(decode.userId);
            if (!user) {
                return res.status(404).json({ message: "Unauthorized" });
            }
            req.user = user;
            next();
        }
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}