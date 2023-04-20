/* eslint-disable func-names */
import { Document, model, Schema } from "mongoose";

export type DeviceData = {
  deviceId: string;
  isActivated?: boolean;
  activateCode: string;
};

export interface IDevice extends DeviceData, Document {}

const DeviceSchema = new Schema<IDevice>({
  isActivated: { type: Boolean },
  activateCode: { type: String, required: true },
});

const DeviceModel = model<IDevice>("Device", DeviceSchema);

export default DeviceModel;
