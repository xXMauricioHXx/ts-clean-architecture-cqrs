import bunyan, { LogLevel } from 'bunyan';
import bformat from 'bunyan-format';
import dotenv from 'dotenv';
const { name } = require('../package.json');

dotenv.config();

export default bunyan.createLogger({
  name,
  stream: bformat({
    outputMode: process.env.LOGGER_BEAUTIFY ? 'short' : 'bunyan',
    levelInString: true,
  }),
  level: (process.env.LOGGER_LEVEL as LogLevel) || 'info',
});
