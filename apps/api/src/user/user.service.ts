import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import CreateUserDto from "./dtos/create-user.dto";
import UpdateUserDto from "./dtos/update-user.dto";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export default class UserService {
  public constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  public async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  public async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id);
  }

  public async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }

  public async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }
}
