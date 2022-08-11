import DailyRotateFile = require('winston-daily-rotate-file');
import * as winston from 'winston';

const format = winston.format;
const alignColorsAndTime = winston.format.combine(
  winston.format.colorize({
    all: true,
  }),
  winston.format.label({
    label: '[LOGGER]',
  }),
  winston.format.timestamp({
    format: 'YY-MM-DD HH:mm:ss',
  }),
  winston.format.printf(
    (info) =>
      ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`,
  ),
);

export default {
  // winstion default config
  winstion: {
    exitOnError: false,
    format: format.combine(
      format.timestamp({
        format: 'YY-MM-DD HH:mm:ss',
      }),
      format.label({
        label: '[LOGGER]',
      }),
      format.splat(),
      format.printf((info) => {
        return `${info.label} ${info.timestamp} ${info.level}: ${info.message}`;
      }),
    ),
    transports: [
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.colorize(),
          alignColorsAndTime,
        ),
      }),
      new DailyRotateFile({
        filename: 'logs/app-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '50m',
        maxFiles: '30d',
      }),
    ],
  },
};
