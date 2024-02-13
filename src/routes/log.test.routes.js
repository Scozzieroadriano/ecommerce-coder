import { Router } from 'express';
import LoggerController from '../controllers/logs.test.controller.js';
const logger = new LoggerController
const router = Router();
// Ruta para probar los logs
router.get('/loggerTest', logger.logTest);

export default router;