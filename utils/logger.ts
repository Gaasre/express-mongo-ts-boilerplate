import winston, { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

export class Logger {
    private out: winston.Logger;
    private Reset = "\x1b[0m";
    private Black = "\x1b[30m";
    private Red = "\x1b[31m";
    private Green = "\x1b[32m";
    private Yellow = "\x1b[33m";
    private Blue = "\x1b[34m";
    private Magenta = "\x1b[35m";
    private Cyan = "\x1b[36m";
    private White = "\x1b[37m";

    constructor() {
        this.out = createLogger({
            levels: {
                debug: 0,
                info: 1,
                warn: 2,
                error: 3
            },
            format: combine(
                timestamp({
                    format: 'DD-MM-YYYY HH:mm:ss'
                }),
                printf(({ level, message, timestamp }) => {
                    let color = "";
                    switch (level) {
                        case "error":
                            color = this.Red;
                            break;
                        case "warn":
                            color = this.Yellow;
                            break;
                        case "info":
                            color = this.Cyan;
                            break;
                        case "debug":
                            color = this.Green;
                            break;
                        default:
                            color = this.White;
                            break;
                    }
                    return `(${timestamp}) ${color}[${level.toUpperCase()}]${this.Reset} ${message}`
                })
            ),
            transports: [new transports.Console()],
        });
    }

    /**
     * Debug log
     * @param {any} message
     */
    public Debug(message: any): void {
        this.out.log("debug", message)
    }

    /**
     * Info log
     * @param {any} message
     */
    public Info(message: any): void {
        this.out.log("info", message)
    }

    /**
     * Warning log
     * @param {any} message
     */
     public Warning(message: any): void {
        this.out.log("warn", message)
    }

    /**
     * Error log
     * @param {any} message
     */
     public Error(message: any): void {
        this.out.log("error", message)
    }
}

