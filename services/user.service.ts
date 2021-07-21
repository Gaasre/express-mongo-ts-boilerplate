import { ISerializedUser, IUser } from "../models/user.model";
import { Logger } from "../utils/logger";
import { IService } from "../interfaces/iservice.interface";
import UserSchema from "../models/user.model";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { UserAccess } from "../interfaces/userAccess.interface";

export class UserService extends IService {

    constructor(logger: Logger, name: string) {
        super(logger, name);
    }

    public async GetUsers(): Promise<IUser[]> {
        return await UserSchema.find({}, { password: 0 });
    }

    public async NewUser(user: IUser): Promise<IUser> {
        return await UserSchema.create(user);
    }

    public async isValid(user: IUser): Promise<boolean> {
        const foundUser: IUser = await UserSchema.findByEmail(user.email, true);
        if (foundUser) {
            // check password
            return await bcrypt.compare(user.password, foundUser.password);
        }
        return false;
    }

    public async getAccess(user: IUser): Promise<UserAccess> {
        const dbUser = await UserSchema.findOne({email: user.email});
        const token = sign({
            email: user.email
        }, process.env.TOKEN_SECRET + "", { expiresIn: '1800s' });
        const access: UserAccess = {
            token,
            _id: dbUser?._id,
            email: dbUser?.email,
            firstName: dbUser?.firstName,
            lastName: dbUser?.lastName
        };
        return access;
    }
}