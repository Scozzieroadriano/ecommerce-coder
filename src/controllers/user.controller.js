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
            //console.log('req.header ::',req.header);
            res.header('Authorization',req.user);
            res.cookie('token', req.user, { 
                httpOnly: true, 
                maxAge: 10 * 60 * 1000,
            });
            res.redirect('http://localhost:8080/api/session/current')
    
        } catch (error) {
            next(error.message);
        }
    }

    logout = async  (req, res) => {
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