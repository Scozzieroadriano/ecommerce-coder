export default class MongoDao {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        try {
            return await this.model.find();            
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            return await this.model.findById(id);            
        } catch (error) {
            console.log(error);
        }
    }

    async create(data) {
        try {
            return await this.model.create(data);            
        } catch (error) {         
            console.log(error);
        }
    }

    async update(id, data) {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            console.log(error);
        }
    }
    async delete(id) {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }
}	