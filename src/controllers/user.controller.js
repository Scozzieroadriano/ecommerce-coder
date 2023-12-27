import Controller from "./class.controller.js";
import UserService from "../services/user.services.js";
import { createResponse } from "../utils.js";
export default class UserController extends Controller {
    constructor() {
        super(new UserService());
    }
    async register(req,res,next) {
        try {
            const data = await this.service.register(req.body);
            if(data) createResponse(res,201,data);
            else createResponse(res,404,{ method: 'register',error: "User already exists"});
        } catch (error) {
            next(error.message);
        }
    }
    async login(req,res,next) {
        try {
            const data = await this.service.login(req.body);
            if(!data) createResponse(res,404,{ method: 'login',error: "Error login"});
            else {
                res.header('Authorization',data);
                createResponse(res,200,data);
            }
        } catch (error) {
            next(error.message);
        }
    }
    async profile (req,res,next) {
        try {
            const { first_name, last_name, email, role } = req.user;
            createResponse(res,200,{
                first_name,
                last_name,
                email,
                role
            });
        } catch (error) {
            next(error.message);
        }
    }
}