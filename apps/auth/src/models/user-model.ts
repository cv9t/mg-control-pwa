import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
  deviceId: string;
  email: string;
  password: string;
  isActivated: boolean;
  activateCode: string;
}

const UserSchema = new Schema<IUser>({
  deviceId: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, required: true },
  activateCode: { type: String, unique: true, required: true },
});

const TokenModel = model<IUser>("User", UserSchema);

export default TokenModel;
