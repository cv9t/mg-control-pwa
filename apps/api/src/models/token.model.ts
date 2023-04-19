/* eslint-disable func-names */
import { Document, model, Schema } from "mongoose";

export interface IToken extends Document {
  user?: string;
  refreshToken: string;
}

const TokenSchema = new Schema<IToken>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  refreshToken: { type: String, required: true },
});

const TokenModel = model<IToken>("Token", TokenSchema);

export default TokenModel;
