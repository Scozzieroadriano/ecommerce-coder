import persistence from "../persistence/persistence.js";
const { userDao } = persistence;
import UserResDto from "../dtos/user.res.dto.js";

export default class UserRepository{
    constructor() {
        this.dao = userDao;
    }

    async getUser(id) {
        try {
            const user = await this.dao.getById(id);
            return new UserResDto(user);
        } catch (error) {
            throw new Error('Error en el proceso de autenticación con Google');
        }
    }
}