import MongoDao from "../mongo.dao.js";
import { UserModel } from "./user.model.js";
import { hashPassword, isValidPassword } from "../../../utils.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';

const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

export default class UserMongoDao extends MongoDao {
    constructor() {
        super(UserModel);
    }
    async register(user) {
        try {
            const {email, password} = user;
            const userExists = await this.getByEmail(email);
            if(!userExists) {
                user.password = hashPassword(password);
                const newUser =  await this.model.create(user);
                return await this.#generateToken(newUser)                
            } else {
                throw new Error('El usuario ya existe');
            }
        } catch (error) {
            console.log(error);
        }
    }   
    async login(user) {
        try {
            const {email, password} = user;
            const userExists = await this.getByEmail(email);
            if(userExists) {
                if(isValidPassword(password, userExists)) {
                    return await this.#generateToken(userExists);
                } else {
                    throw new Error('Invalid password');
                }
            } else {               
                throw new Error('El usuario no existe');
            }
        } catch (error) {
            console.log(error);
        }
    }
    async getByEmail(email) {
        try {
            const userFound = await this.model.findOne({email});  
            if (!userFound) return false;
            else return userFound;    
        } catch (error) {
            console.log(error);
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