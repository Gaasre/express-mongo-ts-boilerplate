import { Router } from "express";
import { IService } from "./iservice.interface";
import { ApiResponse } from "../utils/apiResponse";
import { Logger } from "../utils/logger";

export class IRoute {
    private logger: Logger;
    private services: IService[];
    public router: Router;

    constructor(router: Router, logger: Logger, services: IService[]) {
        this.logger = logger;
        this.router = router;
        this.services = services;
    }
}