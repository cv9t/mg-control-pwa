import { Document, model, Schema } from "mongoose";

export type UserData = {
  device?: string;
  email: string;
  password: string;
};

export interface IUser extends UserData, Document {}

const UserSchema = new Schema<IUser>({
  device: { type: Schema.Types.ObjectId, ref: "Device" },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;
