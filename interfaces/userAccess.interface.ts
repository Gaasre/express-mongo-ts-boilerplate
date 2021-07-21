export interface UserAccess {
    _id?: string;
    email: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    token: string;
}