import { createTransport } from 'nodemailer';
import 'dotenv/config';

export default class MailingService {

    transporter = createTransport({
        //service: 'gmail',
        host: process.env.HOST_MAILING,
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_MAILING,
            pass: process.env.PASSWORD_MAILING
        }

    });

    async sendMail(user, service, token = null) {
        try {
            const { first_name, email } = user
            let msg, subj;

            switch (service) {
                case 'register':
                    msg = await this.createMsgRegister(first_name);
                    subj = 'Bienvenid@';
                    break;
                case 'resetPass':
                    msg = await this.createMsgResetPassword(email);
                    subj = 'Recuperación de contraseña';
                    break;
                case 'inactive':
                    msg = await this.createMsgUserInactive(first_name)
                    subj = 'Cuenta eliminada por inactividad';
                case 'deleteProduct':
                    msg = await this.createMsgDeleteProduct(first_name)
                    subj = 'Producto eliminado';
                default:
                    // Código a ejecutar si el valor de service no coincide con ningún caso
                    break;
            }

            const gmailOptions = {
                from: process.env.EMAIL_MAILING,
                to: email,
                subjet: subj,
                html: msg
            }
            await this.transporter.sendMail(gmailOptions)
            if (token) return token;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createMsgRegister(username) {
        return `<h1> Hola ${username}, Bienvenido al e-commerce!</h1>`
    }

    async createMsgResetPassword(email) {
        return `<p>¡Hola ${email},
                Hace click 
                <a href='http://localhost:8080/reset-password'>AQUÍ</a>
                para restablecer la contraseña
                </p>`
    }
    async createMsgUserInactive(username){
        return (
            `<h2>Hola ${username}, Tu cuenta fue eliminada por inactividad</h2>`
        )};
    
    async createMsgDeleteProduct(username){
        return (
            `<h2>Hola ${username}, Se eliminó tu producto</h2>`
        )};
}