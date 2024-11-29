// utils/logger.js
import { config } from '../config/config.js'

/**
 * Log levels enum
 * @readonly
 * @enum {string}
 */
export const LogLevel = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
}

/**
 * Enhanced logger with support for different log levels
 * @param {LogLevel} level - Log level
 * @param {...any} args - Arguments to log
 */
export function logger(level, ...args) {
  if (!config.DEV_MODE) return

  const timestamp = new Date().toISOString()
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`

  switch (level) {
  case LogLevel.ERROR:
    console.error(prefix, ...args)
    break
  case LogLevel.WARN:
    console.warn(prefix, ...args)
    break
  case LogLevel.INFO:
    console.info(prefix, ...args)
    break
  case LogLevel.DEBUG:
  default:
    console.log(prefix, ...args)
  }
}

// Convenience methods
export const logDebug = (...args) => logger(LogLevel.DEBUG, ...args)
export const logInfo = (...args) => logger(LogLevel.INFO, ...args)
export const logWarn = (...args) => logger(LogLevel.WARN, ...args)
export const logError = (...args) => logger(LogLevel.ERROR, ...args)