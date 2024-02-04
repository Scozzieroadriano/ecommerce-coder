import { createTransport } from 'nodemailer';
import 'dotenv/config';

export default class MailingService {

     transporter = createTransport({
        //service: 'gmail',
        host: process.env.HOST_MAILING,
        port: 465,
        secure: true,
        auth:{
            user: process.env.EMAIL_MAILING,
            pass: process.env.PASSWORD_MAILING
        }
    
    });
}