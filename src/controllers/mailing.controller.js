import 'dotenv/config';
import MailingService from '../services/mailing.services.js';
const mailingService = new MailingService();

export default class EmailController{

    sendEmail = async (req, res, next) =>{
        try {
            const { dest, name } = req.body;
            const gmailOptions = {
                from: process.env.EMAIL_MAILING,
                to: dest,
                subject: 'Bienvenid@',
                html: `<h1>Bienvenido ${name}</h1>`
            };
            const response = await mailingService.transporter.sendMail(gmailOptions)
            res.json(response);
        } catch (error) {
            next(error.message);
        }
    }
}