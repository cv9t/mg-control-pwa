import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./schemas/user.schema";

@Injectable()
export class UserService {
  public constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  public async findOne(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }
}
