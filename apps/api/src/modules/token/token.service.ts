import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { SaveTokenDto } from "./dtos/save-token.dto";
import { Token, TokenDocument } from "./schemas/token.schema";

@Injectable()
export class TokenService {
  public constructor(@InjectModel(Token.name) private readonly tokenModel: Model<Token>) {}

  public async save(saveTokenDto: SaveTokenDto): Promise<TokenDocument> {
    const existingToken = await this.tokenModel.findOne({ user: saveTokenDto.user });
    if (existingToken) {
      existingToken.refreshToken = saveTokenDto.refreshToken;
      return existingToken.save();
    }
    return this.tokenModel.create(saveTokenDto);
  }

  public async findByRefreshToken(refreshToken: string): Promise<TokenDocument | null> {
    return this.tokenModel.findOne({ refreshToken });
  }

  public async remove(refreshToken: string) {
    return this.tokenModel.deleteOne({ refreshToken });
  }
}
