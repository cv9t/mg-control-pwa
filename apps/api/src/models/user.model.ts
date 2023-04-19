/* eslint-disable func-names */
import { Document, model, Schema } from "mongoose";

import { hashPassword } from "@/utils/password.utils";

export type UserData = {
  device?: string;
  email: string;
  password: string;
};

export interface IUser extends UserData, Document {
  isPassValid: (password: string) => boolean;
}

const UserSchema = new Schema<IUser>({
  device: { type: Schema.Types.ObjectId, ref: "Device" },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

UserSchema.methods.isPassValid = function (password: string) {
  return this.password === hashPassword(password);
};

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;
