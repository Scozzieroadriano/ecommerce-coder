export default class Services {
    constructor(dao) {
        this.dao = dao;
    }
    async getAll() {
        try {            
            return await this.dao.getAll();
        } catch (error) {
            throw error;
        }
    }
    async getById(id) {
        try {
            return await this.dao.getById(id);
        } catch (error) {
            throw error;
        }
    }
    async create(data) {
        try {
            return await this.dao.create(data);
        } catch (error) {
            throw error;
        }
    }
    async update(id, data) {
        try {
            return await this.dao.update(id, data);
        } catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            return await this.dao.delete(id);
        } catch (error) {
            throw error;
        }
    }
}