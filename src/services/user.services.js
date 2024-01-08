import Services from "./class.services.js";
import UserMongoDao from "../daos/mongodb/users/user.dao.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';

const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

export default class UserService extends Services {
    constructor() {
        super(new UserMongoDao());
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
    async authGoogle(user) {
       try {
            const userFound = await this.dao.getByEmail(user.email);
            
            if (userFound) {
                return await this.#generateToken(userFound)
            }else {
                const newUser =  await this.dao.register(user);
                return await this.#generateToken(newUser);
            }
        } catch (error) {
            console.log(error);
            throw new Error('Error en el proceso de autenticación con Google');
        }
    }
    async #generateToken(user) {
        try {
            const payload = {
                id: user._id
            };
            return jwt.sign(payload, SECRET_KEY_JWT, {expiresIn: '10m'});
        } catch (error) {
            console.log(error);
        }
    }
}