const winston = require("winston");

// Define log levels and colors
const logLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "blue",
  },
};

// Create logger instance
const logger = winston.createLogger({
  level: "info",
  levels: logLevels.levels,
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
      ({ level, message, timestamp }) =>
        `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
      level: "info",
    }), // Log to console
    new winston.transports.File({ filename: "error.log", level: "error" }), // Log errors to file
    new winston.transports.File({ filename: "combined.log" }), // Log all levels to file
  ],
});

module.exports = logger;
