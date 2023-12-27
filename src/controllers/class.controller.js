import { createResponse } from "../utils";
export default class Controller {
    constructor(service) {
        this.service = service;
    }
    async getAll(req,res,next) {
        try {
            const data = await this.service.getAll();
            createResponse(res,200,data);
        } catch (error) {
            next(error.message);
        }
    }
    async getById(req,res,next) {
        try {
            const data = await this.service.getById(req.params.id);
            if(data) createResponse(res,200,data);
            else createResponse(res,404,{ method: 'getById',error: "Not found"});
        } catch (error) {
            next(error.message);
        }
    }
    async create (req,res,next) {
        try {
            const data = await this.service.create(req.body);
            if(data) createResponse(res,201,data);
            else createResponse(res,404,{ method: 'create',error: "Bad request"});
        } catch (error) {
            next(error.message);
        }
    }
    async update (req,res,next) {
        try {
            const data = await this.service.update(req.params.id,req.body);
            if(data) createResponse(res,200,data);
            else createResponse(res,404,{ method: 'update',error: "Bad request"});
        } catch (error) {
            next(error.message);
        }
    }
}