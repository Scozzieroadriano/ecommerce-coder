import { createResponse } from "../utils.js";
export default class Controller {
    constructor(service) {
        this.service = service;
    }
    getAll = async (req, res, next) => {
        try {          
            const data = await this.service.getAll();
            createResponse(res, 200, data);
        } catch (error) {
            next(error.message);
        }
    }
    getById = async (req,res,next) =>{
        try {
            const data = await this.service.getById(req.params.id);
            if(data) createResponse(res,200,data);
            else createResponse(res,404,{ method: 'getById',error: "Not found"});
        } catch (error) {
            next(error.message);
        }
    }
    create = async (req,res,next) =>{
        try {
            const data = await this.service.create(req.body);
            if(data) createResponse(res,201,data);
            else createResponse(res,404,{ method: 'create',error: "Bad request"});
        } catch (error) {
            next(error.message);
        }
    }
    update  = async (req,res,next) =>{
        try {
            const {id} = req.params;
            const data = await this.service.getById(id);
            if(!data) {
                createResponse(res,404,{ method: 'update',error: "Bad request"})
            } else {
                const updated = await this.service.update(id,req.body);
                createResponse(res,200,updated);
            }
        } catch (error) {
            next(error.message);
        }
    }
    delete = async (req,res,next) =>{
        try {
            const {id} = req.params;
            console.log(req.params);
            const data = await this.service.getById(id);
            console.log(data);
            if(!data) {
                createResponse(res,404,{ method: 'delete',error: "Bad request"})
            } else {
                await this.service.delete(id);
                createResponse(res,200,{message: "Deleted"});
            }
        } catch (error) {
            next(error.message);
        }
    }
}