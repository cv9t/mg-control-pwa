import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
  deviceId: string;
  email: string;
  password: string;
  isActivated: boolean;
  activationCode: string;
}

const UserSchema = new Schema<IUser>({
  deviceId: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, required: true },
  activationCode: { type: String, unique: true, required: true },
});

export default model<IUser>("User", UserSchema);
