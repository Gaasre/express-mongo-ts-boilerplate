import { Router } from "express";
import { Logger } from "../../utils/logger";
import path from "path";
import fs from "fs";
import { IService } from "../../interfaces/iservice.interface";
import { ServiceLibrary } from "../../services/library.service";

export class PrivateApi {
    public router: Router;
    private logger: Logger;
    private appDir = path.dirname(require.main ? require.main.filename: "");
    public services: IService[];

    constructor(logger: Logger) {
        this.logger = logger;
        this.router = Router();
        this.services = [];
    }

    public async LoadRoutes() {
        //Load all routes
        const files = fs.readdirSync('./dist/api/private');

        await Promise.all(files.filter(file => file != 'index.js').map(async (file) => {
            await this.LoadServices();
            const routeName = "/" + file.replace('.js', '');
            file = `${this.appDir}/api/private/${file}`;
            const route = await import(file);
            const key = Object.keys(route)[0]
            this.router.use(routeName, new route[key](this.router, this.logger, this.services).router);
            this.logger.Info(`Loaded private route ${routeName}`);
        }));
    }

    private async LoadServices() {
        //Load services
        const lib = new ServiceLibrary(this.logger);
        await lib.LoadServices();
        this.services = lib.library;
    }
}