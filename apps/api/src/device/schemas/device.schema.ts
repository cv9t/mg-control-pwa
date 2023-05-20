import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type DeviceDocument = Device & Document;

@Schema()
export class Device {
  @Prop()
  public isActivated: boolean;

  @Prop()
  public activateCode: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
