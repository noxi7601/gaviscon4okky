interface Inflammation {
    id: number;
    name: string;
    active: boolean;
}

type Inflammations = Inflammation[];

declare class LogLevel {
    static DEBUG: number;
    static LOG: number;
    static INFO: number;
    static WARN: number;
}

declare class Logger {
    log(...datas: any[]): void;
    info(...datas: any[]): void;
    warn(...datas: any[]): void;
}

declare const logger: Logger;
