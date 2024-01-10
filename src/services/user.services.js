import Services from "./class.services.js";
import UserMongoDao from "../daos/mongodb/users/user.dao.js";


export default class UserService extends Services {
    constructor() {
        super(new UserMongoDao());
    }

    async register(user) {
        try {
            return await this.dao.register(user);
        } catch (error) {
            console.log(error);
        }
    }
    async login(user) {
        try {
            const userFound = await this.dao.login(user);
            return userFound
        } catch (error) {
            console.log(error);
        }
    }
    async authGoogle(user) {
       try {
            const userFound = await this.dao.getByEmail(user.email);
            
            if (userFound) {
                return await this.dao.login(user)
            }else {
                return await this.dao.register(user)                
            }
        } catch (error) {
            console.log(error);
            throw new Error('Error en el proceso de autenticación con Google');
        }
    }
}