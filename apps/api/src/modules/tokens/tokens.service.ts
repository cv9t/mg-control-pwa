import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { DeleteResult } from '@mg-control/api/common/types';
import { Nullable } from '@mg-control/shared/typings';

import { SaveTokenDto } from './dtos/save-token.dto';
import { Token, TokenDocument } from './schemas/token.schema';

@Injectable()
export class TokensService {
  public constructor(@InjectModel(Token.name) private readonly tokenModel: Model<Token>) {}

  public async save(saveTokenDto: SaveTokenDto): Promise<TokenDocument> {
    const existingToken = await this.tokenModel.findOne({ user: saveTokenDto.user });
    if (existingToken) {
      existingToken.refreshToken = saveTokenDto.refreshToken;
      return existingToken.save();
    }
    return this.tokenModel.create(saveTokenDto);
  }

  public async findByRefreshToken(refreshToken: string): Promise<Nullable<TokenDocument>> {
    return this.tokenModel.findOne({ refreshToken });
  }

  public async remove(refreshToken: string): Promise<DeleteResult> {
    return this.tokenModel.deleteOne({ refreshToken });
  }
}
