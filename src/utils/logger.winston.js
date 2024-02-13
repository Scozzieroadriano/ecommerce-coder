import { createLogger, transports } from 'winston';
import { __dirname } from './utils.js';
const levels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  http: 4,
  debug: 5
  };

const developmentLogger = createLogger({
  levels: levels,
  level: 'debug',
  transports: [
    new transports.Console()
  ]
});

const productionLogger = createLogger({
    levels: levels,
    level: 'info', 
    transports: [
      new transports.File({ filename: (__dirname, './src/logs/errors.log'), level: 'info' })
    ]
  });
  
  export { developmentLogger, productionLogger };