/**
 * @typedef {Object} Inflammation
 * @property {number} id
 * @property {string} name
 * @property {boolean} active
 */

/**
 * @typedef {Inflammation[]} Inflammations
 */

class LogLevel {
    static DEBUG = 0;
    static LOG = 1;
    static INFO = 2;
    static WARN = 3;
}

class Logger {
    /**
     * @param {number} level
     */
    constructor(level) {
        this._level = level;
    }

    /**
     * @param {any[]} datas
     */
    log(...datas) {
        if (this._level >= LogLevel.LOG) {
            console.log(...datas);
        }
    }

    /**
     * @param {any[]} datas
     */
    info(...datas) {
        if (this._level >= LogLevel.INFO) {
            console.info(...datas);
        }
    }

    /**
     * @param {any[]} datas
     */
    warn(...datas) {
        if (this._level >= LogLevel.WARN) {
            console.warn(...datas);
        }
    }

    get level() {
        return this._level;
    }
}

const logger = new Logger(LogLevel.INFO);
