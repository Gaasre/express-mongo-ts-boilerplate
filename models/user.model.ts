import mongoose, { Schema, Document, Model } from 'mongoose';
import { hashPassword } from '../utils/helpers';

export interface ISerializedUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
}

export interface IUser extends ISerializedUser {
  password: string;
}

export interface UserModel extends Model<IUser> {
  findByEmail(email: string, includePassword: boolean): Promise<IUser>
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

// Static functions
UserSchema.statics.findByEmail = async function (
  this: Model<IUser>,
  email: string,
  includePassword: boolean
) {
  if (includePassword) {
    return this.findOne({email: email});
  }
  return this.findOne({email: email}, { password: 0 });
}

// Middlewares
UserSchema.pre<IUser>("save", async function(next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
});

// Export the model and return your IUser interface
export default mongoose.model<IUser, UserModel>('users', UserSchema);