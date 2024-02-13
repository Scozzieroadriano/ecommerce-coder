export default class MongoDao {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        try {
            return await this.model.find();            
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        try {
            return await this.model.findById(id);            
        } catch (error) {
            throw error;
        }
    }

    async create(data) {
        try {
            return await this.model.create(data);            
        } catch (error) {         
            throw error;
        }
    }

    async update(id, data) {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }
}	