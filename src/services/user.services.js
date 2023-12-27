import Services from "./class.services.js";
import UserMongoDao from "../daos/mongodb/users/user.dao.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';

const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

export default class UserService extends Services {
    constructor() {
        super(new UserMongoDao());
    }

    async #generateToken(user) {
        try {
            const payload = {
                id: user._id,
                email: user.email
            };
            return jwt.sign(payload, SECRET_KEY_JWT, {expiresIn: '10m'});
        } catch (error) {
            console.log(error);
        }
    }
    async register(user) {
        try {
            return await this.dao.register(user);
        } catch (error) {
            console.log(error);
        }
    }
    async login(user) {
        try {
            const userFound = await this.dao.login(user);
            if (userFound) return await this.#generateToken(userFound);
            else return null;            
        } catch (error) {
            console.log(error);
        }
    }
}