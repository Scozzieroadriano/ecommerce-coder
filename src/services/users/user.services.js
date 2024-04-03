import Services from "../class.services.js";
import persistence from "../../persistence/persistence.js";
import UserRepository from "../../repository/user.repository.js";
import MailingService from "../mailing/mailing.services.js";
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
            throw new Error('Error al obtener el usuario');
        }
    }
    async getAllUsers() {
        try {
            const users = await userRepository.getAllUsers();
            if(!users) return false;
            else return users;
        } catch (error) {
            throw new Error('Error al obtener los usuarios');
        }
    }


    async register(user) {
        try {
            const response = await this.dao.register(user);
            if (!response) return false;
            await mailingService.sendMail(user, 'register')
            return response;
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
    async resetPassword(email) {
        try {
            const response = await this.dao.resetPassword(email);
            if (response){
                await mailingService.sendMail(response.user, 'resetPass', response.token) 
                return response; 
            } else {
                return false;
            }
        } catch (error) {
            throw error;
        }
    }
    async changePassword(user,pass,newPassword){
        try {
            const response = await this.dao.changePassword(user,pass, newPassword);
            if (response) return response;
            return false;
        } catch (error) {
            throw error;
        }
    }
    async changeRoles(userId) {
        try {
            const user = await userRepository.getUser(userId);
            if (user.role === "user"){
                user.role = "premium";
            } else if (user.role === "premium") {
                user.role = "user"
            }
            return await this.dao.update(userId, user); 
        } catch (error) {
            
        }
    }
    async deleteUsers() {
        try{
            const users = await userDao.deleteUsers();
            users.forEach(user => {
                mailingService.sendMail(user, 'inactive')
            });
        return users;

        }catch(error){
            throw new Error(error.message);
        };
    };
      
}