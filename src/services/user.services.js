import Services from "./class.services.js";
import persistence from "../persistence/persistence.js";
import UserRepository from "../repository/user.repository.js";
const userRepository = new UserRepository();
const { userDao } = persistence;


export default class UserService extends Services {
    constructor() {
        super(userDao);
    }
    async getUser(id) {
        try {
            const user = await userRepository.getUser(id);
            if(!user) return false;
            else return user;
        } catch (error) {
            throw new Error('Error al obtener el usuarios');
        }
    }

    async register(user) {
        try {
            return await this.dao.register(user);
        } catch (error) {
            throw error;
        }
    }
    async login(user) {
        try {
            const userFound = await this.dao.login(user);
            return userFound
        } catch (error) {
            throw error;
        }
    }
    async authGoogle(user) {
        try {
          const userFound = await this.dao.getByEmail(user.email);
          if (userFound) {
            return await this.dao.login(user);
          } else {
            return await this.dao.register(user);
          }
        } catch (error) {
          throw new Error('Error en el proceso de autenticación con Google');
        }
      }
      
}