import { developmentLogger, productionLogger } from '../utils/logger.winston.js';

class LoggerController {
  constructor() {}

  logTest(req, res) {
    // Logs para prueba
    developmentLogger.debug('Debug message');
    developmentLogger.info('Info message');
    developmentLogger.warn('Warning message');
    developmentLogger.http('Http message');
    developmentLogger.error('Error message');
    developmentLogger.fatal('Fatal message');
    
    // Logs para produccion
    productionLogger.debug('Debug message');
    productionLogger.info('Info message');
    productionLogger.warn('Warning message');
    productionLogger.http('Http message');
    productionLogger.error('Error message');
    productionLogger.fatal('Fatal message');

    res.send('Logs generados para prueba.');
  }
}

export default LoggerController;