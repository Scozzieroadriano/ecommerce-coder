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
            const { username, email } = user
            let msg, subj;

            switch (service) {
                case 'register':
                    msg = await this.createMsgRegister(username);
                    subj = 'Bienvenid@';
                    break;
                case 'resetPass':
                    msg = await this.createMsgResetPassword(email);
                    subj = 'Recuperación de contraseña';
                    break;
                case 'inactividad':
                    msg = await this.createMsgUserInactive(username)
                    subj = 'Cuenta eliminada por inactividad';
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
    async createMsgUserInactive(first_name){
        return (
            `<h2>Hola ${first_name}, Tu cuenta fue eliminada por inactividad</h2>`
        )};
    
    async createMsgDeleteProduct(first_name){
        return (
            `<h2>Hola ${first_name}, Se eliminó tu producto</h2>`
        )};
}