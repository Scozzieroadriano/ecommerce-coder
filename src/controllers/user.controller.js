import Controller from "./class.controller.js";
import UserService from "../services/user.services.js";
import { createResponse } from "../utils.js";
export default class UserController extends Controller {
    constructor() {
        super(new UserService());
    }
    register = async (req,res,next) => {
        try {
            const data = await this.service.register(req.body);
            if(data) createResponse(res,201,data);
            else createResponse(res,404,{ method: 'register',error: "User already exists"});
        } catch (error) {
            next(error.message);
        }
    }
    login = async (req,res,next) => {
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
    profile = async (req,res,next) => {
        try {
            const { first_name, last_name,role, _id } = req.user;
            createResponse(res,200,{
                _id,
                first_name,
                last_name,
                role
            });
        } catch (error) {
            next(error.message);
        }
    }
    googleResponse = async (req,res,next) => {
        try {
            console.log('req.user ::',req.user);
            //console.log('usser:',req.user);
            //createResponse(res,200,{msg:'Register or login with google'})
    
        } catch (error) {
            next(error.message);
        }
    }
}