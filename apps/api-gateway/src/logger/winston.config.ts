import { format, transports } from 'winston';

export const winstonConfig = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    verbose: 4,
  },
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json(),
  ),
  transports: [
    new transports.Console({
      level: 'debug',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
};
