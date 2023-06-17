import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Nullable } from '@mg-control/shared/types';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  public constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  public async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.userModel.create(createUserDto);
  }

  public async findById(id: string): Promise<Nullable<UserDocument>> {
    return this.userModel.findById(id);
  }

  public async findByEmail(email: string): Promise<Nullable<UserDocument>> {
    return this.userModel.findOne({ email });
  }

  public async update(id: string, updateUserDto: UpdateUserDto): Promise<Nullable<UserDocument>> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }
}
