import Services from "./class.services.js";
import persistence from "../persistence/persistence.js";
import UserRepository from "../repository/user.repository.js";
import CartService from "../services/cart.services.js";
const userRepository = new UserRepository();
const cartService = new CartService();
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
            return await this.dao.login(user);
          } else {
            const newUser = await this.dao.register(user);
            if (newUser) {
              const newCart = await cartService.create();
              // Actualizar el usuario con la referencia al nuevo carrito
              await this.dao.update(newUser.user._id, { cart: newCart._id });
              return newUser;
            } else {
              return false;
            }
          }
        } catch (error) {
          throw new Error('Error en el proceso de autenticación con Google');
        }
      }
      
}