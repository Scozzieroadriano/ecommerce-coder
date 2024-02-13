import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { hashSync,genSaltSync,compareSync } from 'bcrypt';
export const __dirname = dirname(fileURLToPath(import.meta.url));

//  Metodos para hashear con Bcrypt

// Registro
export const hashPassword = (password) => {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
}
// Login
export const isValidPassword = (password,user) => {
    return compareSync(password,user.password);
}
export const createResponse = (res, statusCode, data)=>{
    return res.status(statusCode).json(data);
}
