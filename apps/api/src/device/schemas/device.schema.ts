import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Device {
  @Prop()
  public isActivated: boolean;

  @Prop()
  public activateCode: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
