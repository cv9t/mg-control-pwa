import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  public user: Types.ObjectId;

  @Prop({ required: true })
  public refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
