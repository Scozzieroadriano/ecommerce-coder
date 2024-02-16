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
            let msg = ''
            let subj = ''
            const { username, email } = user

            if (service === 'register') {
                msg = await this.createMsgRegister(username);
                subj = 'Bienvenid@';
            } else if (service === 'resetPass') {
                msg = await this.createMsgResetPassword(username);
                subj = 'Recuperación de contraseña'
            }

            const gmailOptions = {
                from: process.env.EMAIL_MAILING,
                to: email,
                subjet: subj,
                html: msg
            }
            await this.transporter.sendMail(gmailOptions)
            if (token) return token;
            console.log('email enviado');
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createMsgRegister(username) {
        return `<h1> Hola ${username}, Bienvenido al e-commerce!</h1>`
    }

    async createMsgResetPassword(username) {
        return `<p>¡Hola ${username},
                Hace click 
                <a href='http://localhost:8080/new-pass'>AQUÍ</a>
                para restablecer la contraseña
                </p>`
    }
}