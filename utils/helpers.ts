import { hash, genSalt } from "bcrypt";
import { ISerializedUser, IUser } from "../models/user.model";

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    return await hash(password, salt);
}

export function serializeUser(user: IUser): ISerializedUser {
    const serialized: ISerializedUser = user;
    return serialized;
}