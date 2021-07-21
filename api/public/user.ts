import { Router } from "express";
import { IUser } from "../../models/user.model";
import { ApiResponse } from "../../utils/apiResponse";
import { Logger } from "../../utils/logger";
import { IRoute } from "../../interfaces/iroute.interface";
import { body, validationResult } from 'express-validator';
import { emailExist } from "../../utils/validators";
import { serializeUser } from "../../utils/helpers";
import { UserAccess } from "../../interfaces/userAccess.interface";

export class UserRoute extends IRoute {

    constructor(router: Router, logger: Logger, services: any) {
        super(router, logger, services);

        router.get('/', (req, res) => {
            services.UserService.GetUsers().then((users: IUser[]) => {
                return ApiResponse.SuccessResponseWithData(res, 'Success', users);
            })
        })

        router.post('/new',
        body('email').isEmail().custom(emailExist),
        body('password').exists(),
        body('firstName').exists(),
        body('lastName').exists(),
        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return ApiResponse.ValidationErrorWithData(res, 'ValidationError', errors);
            }

            const data: IUser = req.body;
            services.UserService.NewUser(data).then((user: IUser) => {
                return ApiResponse.SuccessResponseWithData(res, 'Success', serializeUser(user));
            })
        })

        router.post('/login',
        async (req, res) => {
            const data: IUser = req.body;
            const valid = await services.UserService.isValid(data);
            if (valid) {
                const userAccess: UserAccess = await services.UserService.getAccess(data);
                return ApiResponse.SuccessResponseWithData(res, 'Success', userAccess);
            }
        })
    }
}