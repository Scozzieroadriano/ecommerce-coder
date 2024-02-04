import { Router } from 'express';
import EmailController from '../controllers/mailing.controller.js';
const emailController = new EmailController();
const router = Router()

router.post('/send', emailController.sendEmail) 

export default router