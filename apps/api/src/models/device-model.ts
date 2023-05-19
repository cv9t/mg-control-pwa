/* eslint-disable func-names */
import { Document, model, Schema } from "mongoose";

export interface IDevice extends Document {
  deviceId: string;
  isActivated?: boolean;
  activateCode: string;
}

const DeviceSchema = new Schema<IDevice>({
  isActivated: { type: Boolean },
  activateCode: { type: String, required: true },
});

const DeviceModel = model<IDevice>("Device", DeviceSchema);

export default DeviceModel;
