import { CustomValidator } from "express-validator";
import User from "../models/user.model";

export const emailExist: CustomValidator = value => {
    return User.findByEmail(value, false).then(user => {
        if (user) {
            return Promise.reject('E-mail already in use');
        }
    });
};