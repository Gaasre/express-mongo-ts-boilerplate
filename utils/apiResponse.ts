import { Response } from "express";

export class ApiResponse {
    public static SuccessResponse(res: Response, msg: any): Response {
        const data = {
            status: 1,
            message: msg
        };
        return res.status(200).json(data);
    }

    public static SuccessResponseWithData(res: Response, msg: any, data: any): Response {
        const resData = {
            status: 1,
            message: msg,
            data
        };
        return res.status(200).json(resData);
    }

    public static ErrorResponse(res: Response, msg: any): Response {
        const data = {
            status: 0,
            message: msg
        };
        return res.status(500).json(data);
    }

    public static NotFoundResponse(res: Response, msg: any): Response {
        const data = {
            status: 0,
            message: msg
        };
        return res.status(404).json(data);
    }

    public static ValidationErrorWithData(res: Response, msg: any, data: any): Response {
        const resData = {
            status: 0,
            message: msg,
            data
        };
        return res.status(400).json(resData);
    }

    public static UnauthorizedResponse(res: Response, msg: any): Response {
        const data = {
            status: 0,
            message: msg,
        };
        return res.status(400).json(data);
    }
}