import MongoDao from "../mongo.dao.js";
import { UserModel } from "./user.model.js";
import { hashPassword, isValidPassword } from "../../../utils/utils.js";
import CartMongoDao from "../carts/cart.dao.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';

const cartMongoDao = new CartMongoDao();
const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

export default class UserMongoDao extends MongoDao {
    constructor() {
        super(UserModel);
    }
    async register(user) {
        try {
            const { email, password } = user;
            const userExists = await this.getByEmail(email);
            if (!userExists) {
                user.password = hashPassword(password);
                const newUser = await this.model.create(user);
                const token = await this.generateToken(newUser)
                const newCart = await cartMongoDao.create()
                await this.update(newUser._id, { cart: newCart._id });
                return { message: 'Registro Exitoso', user: newUser, token: token };
            } else {
                throw new Error('El usuario ya existe');
            }
        } catch (error) {
            throw error;
        }
    }
    async login(user) {
        try {
            const { email, password } = user;
            const userExists = await this.getByEmail(email);
            if (userExists) {
                if (isValidPassword(password, userExists)) {
                    const token = await this.generateToken(userExists)
                    await this.updateLastConnection(userExists._id);
                    return { message: 'Login Exitoso', user: userExists, token: token };
                } else {
                    throw new Error('Invalid password');
                }
            } else {
                throw new Error('El usuario no existe');
            }
        } catch (error) {
            throw error;
        }
    }
    async getByEmail(email) {
        try {
            const userFound = await this.model.findOne({ email });
            if (!userFound) return false;
            else return userFound;
        } catch (error) {
            throw error;
        }
    }

    async generateToken(user, expires) {
        try {
            const payload = {
                id: user._id
            };
            const token = jwt.sign(payload, SECRET_KEY_JWT, { expiresIn: expires || '10m' });
            return token
        } catch (error) {
            throw error;
        }
    }

    async resetPassword(email) {
        try {
            const user = await this.getByEmail(email);
            if (!user) {
                throw new Error('Usuario no encontrado');
            } else {
                const token = await this.generateToken(user, '1h');
                return { message: 'Se ha enviado un enlace de restablecimiento de contraseña al correo electrónico del usuario', token: token, user: user };
            }
        } catch (error) {
            throw error;
        }
    }
    async changePassword(user, pass, newPassword) {
        try {
            if (pass === newPassword) {
                if (isValidPassword(pass, user)) {
                    throw new Error("La contraseña nueva no puede ser igual a la contraseña anterior");
                } else {
                    const newPass = hashPassword(pass);
                    return await this.update(user._id, { password: newPass });
                }
            } else {
                throw new Error("las constraseñas no coinciden");
            }
        } catch (error) {
            throw error;
        }
    }
    async updateLastConnection(userId) {
        try {
            await this.model.updateOne({ _id: userId }, { $set: { last_connection: new Date() } });
        } catch (error) {
            throw error;
        }
    }
    async deleteUsers() {
        try {
            const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000); // 10 days ago
            const inactiveUsers = await this.model.find({ last_connection: { $lt: tenDaysAgo } });
            await this.model.deleteMany({ _id: { $in: inactiveUsers.map(user => user._id) } });
            return inactiveUsers;
        } catch (error) {
            throw error;
        }
    }
}