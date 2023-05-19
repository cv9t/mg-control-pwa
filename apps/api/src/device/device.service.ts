import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { User } from "@/user/schemas/user.schema";

import { Device } from "./schemas/device.schema";

@Injectable()
export class DeviceService {
  public constructor(@InjectModel(Device.name) private readonly deviceModel: Model<Device>) {}

  public async findOne(activateCode: string): Promise<User | null> {
    return this.deviceModel.findOne({ activateCode });
  }
}
