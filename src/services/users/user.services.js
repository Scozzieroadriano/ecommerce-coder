import Services from "../class.services.js";
import persistence from "../../persistence/persistence.js";
import UserRepository from "../../repository/user.repository.js";
import MailingService from "./mailing.services.js";
const mailingService = new MailingService();
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
            const response = await this.dao.register(user);
            await mailingService.sendMail(user, 'register')
            return response
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
            const newUser =  await this.dao.register(user);
            await mailingService.sendMail(user, 'register')
            return newUser;
          }
        } catch (error) {
          throw new Error('Error en el proceso de autenticación con Google');
        }
      }
      
}