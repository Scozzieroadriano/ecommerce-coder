import MongoDao from "../mongo.dao.js";
import { UserModel } from "./user.model.js";
import { hashPassword, isValidPassword } from "../../../utils.js";

export default class UserMongoDao extends MongoDao {
    constructor() {
        super(UserModel);
    }
    async register(user) {
        try {
            const {email, password} = user;
            const userExists = this.getByEmail(email);
            if(!userExists) {
                user.password = hashPassword(password);
                return await this.model.create(user);                
            } else {
                throw new Error('User already exists');
            }
        } catch (error) {
            console.log(error);
        }
    }   
    async login(user) {
        try {
            const {email, password} = user;
            const userExists = this.getByEmail(email);
            if(userExists) {
                if(isValidPassword(password, userExists)) {
                    return userExists;
                } else {
                    throw new Error('Invalid password');
                }
            } else {               
                throw new Error('User not found');
            }
        } catch (error) {
            console.log(error);
        }
    }
    async getByEmail(email) {
        try {
            return await this.model.findOne({email});            
        } catch (error) {
            console.log(error);
        }
    }
}