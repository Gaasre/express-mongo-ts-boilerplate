import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ApiResponse } from '../utils/apiResponse';
import UserSchema from "../models/user.model";

export async function authenticateToken(req: any, res: Response, next: any) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return ApiResponse.UnauthorizedResponse(res, 'You are not authorized to view this page');
    } 

    jwt.verify(token, process.env.TOKEN_SECRET as string, async (err: any, user: any) => {
        if (!user) {
            return ApiResponse.UnauthorizedResponse(res, 'Bad Authorization format');
        }

        if (err) {
            return ApiResponse.UnauthorizedResponse(res, 'You are not authorized to view this page');
        }

        const userFound = await UserSchema.findByEmail(user.email, false);

        if (Date.now() >= user.exp * 1000) {
            return ApiResponse.UnauthorizedResponse(res, 'Your session has expired');
        }

        if (userFound) {
            req.user = user;
            next()
        } else {
            return ApiResponse.UnauthorizedResponse(res, 'This user does not exist');
        }
    })
}