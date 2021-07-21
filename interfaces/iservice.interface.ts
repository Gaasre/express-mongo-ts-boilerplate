import { Logger } from "../utils/logger";

export class IService {
    name: string;
    logger: Logger;

    constructor(logger: Logger, name: string) {
        this.logger = logger;
        this.name = name;
    }
}