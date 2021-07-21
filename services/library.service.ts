import { Logger } from "../utils/logger";
import path from "path";
import fs from "fs";
import { IService } from "../interfaces/iservice.interface";

export class ServiceLibrary {
    private logger: Logger;
    private appDir = path.dirname(require.main ? require.main.filename : "");

    public library: any;

    constructor(logger: Logger) {
        this.logger = logger;
        this.library = {};
    }

    public async LoadServices() {
        const files = fs.readdirSync('./dist/services');

        const lib = await Promise.all(files.filter(file => file != 'library.service.js').map(async (file) => {
            const routeName = "/" + file.replace('.js', '');
            file = `${this.appDir}/services/${file}`;
            const service = await import(file);
            const key = Object.keys(service)[0]
            this.logger.Info(`Loaded service ${routeName.replace('/', '')}`);
            return new service[key](this.logger, key);
        }));

        lib.forEach((s: IService) => {
            this.library[s.name] = s;
        });
    }
}