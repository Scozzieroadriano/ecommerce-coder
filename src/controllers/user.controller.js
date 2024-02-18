import Controller from "./class.controller.js";
import UserService from "../services/users/user.services.js";
import { createResponse } from "../utils/utils.js";
import { productionLogger } from "../utils/logger.winston.js";
export default class UserController extends Controller {
    constructor() {
        super(new UserService());
    }
    register = async (req, res, next) => {
        try {
            const data = await this.service.register(req.body);
            if (data) { createResponse(res, 201, data); }
            else {
                productionLogger.info("El usuario ya existe");
                createResponse(res, 404, { method: 'register', error: "User already exists" })
            }
        } catch (error) {
            productionLogger.error(error.message);
            next(error.message);
        }
    }
    login = async (req, res, next) => {
        try {
            const data = await this.service.login(req.body);
            if (!data) {
                productionLogger.warn('Intento de inicio de sesión con credenciales incorrectas');
                createResponse(res, 404, { method: 'login', error: "Error login" })
            }
            else {

                res.cookie('token', data.token, {
                    httpOnly: true,
                    maxAge: 10 * 60 * 1000,
                });
                res.header('Authorization', data.token);
                createResponse(res, 200, data);
            }
        } catch (error) {
            next(error.message);
            productionLogger.error(error.message);
        }
    }
    profile = async (req, res, next) => {
        try {
            const { _id } = req.user;
            const user = await this.service.getUser(_id);
            if (!user) return false;
            else return createResponse(res, 200, user);
        } catch (error) {
            next(error.message)
        }
    }
    googleResponse = async (req, res, next) => {
        try {
            res.cookie('token', req.user.token, {
                httpOnly: true,
                maxAge: 10 * 60 * 1000,
            });
            res.header('Authorization', req.user);
            res.redirect('http://localhost:8080/api/session/current/');
        } catch (error) {
            productionLogger.error(error.message);
            next(error.message);
        }
    }

    resetPassword = async (req, res, next) => {
        try {
            const { email } = req.body;
            const result = await this.service.resetPassword(email);
            if (result) {
                createResponse(res, 200, result)
            } else {
                return false;
            }
        } catch (error) {
            next(error.message);
        }
    }

    logout = async (req, res, next) => {
        res.clearCookie('token');
        req.logout((err) => {
            if (err) {
                console.error('Error al cerrar sesión:', err);
                return res.send(err);
            }
            res.render('login')
        });
    }
}