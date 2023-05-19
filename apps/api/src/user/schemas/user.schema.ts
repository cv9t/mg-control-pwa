import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Device" })
  public device: string | undefined;

  @Prop({ type: String, unique: true })
  public email: string;

  @Prop({ type: String, required: true })
  public password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
