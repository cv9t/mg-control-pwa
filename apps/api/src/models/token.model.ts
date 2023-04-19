/* eslint-disable func-names */
import { Document, Model, model, Schema } from "mongoose";

export interface IToken extends Document {
  user?: string;
  refreshToken: string;
}

interface ITokenModel extends Model<IToken> {
  findByUserId: (userId: string) => Promise<IToken | null>;
  findByRefreshToken: (refreshToken: string) => Promise<IToken | null>;
}

const TokenSchema = new Schema<IToken>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  refreshToken: { type: String, required: true },
});

TokenSchema.statics.findByUserId = function (userId: string) {
  return this.findOne({ user: userId });
};

TokenSchema.statics.findByRefreshToken = function (refreshToken: string) {
  return this.findOne({ refreshToken });
};

const TokenModel: ITokenModel = model<IToken, ITokenModel>("Token", TokenSchema);

export default TokenModel;
