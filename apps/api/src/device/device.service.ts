import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import UpdateDeviceDto from "./dtos/update-device.dto";
import { Device, DeviceDocument } from "./schemas/device.schema";

@Injectable()
export default class DeviceService {
  public constructor(@InjectModel(Device.name) private readonly deviceModel: Model<Device>) {}

  public async findByActivateCode(activateCode: string): Promise<DeviceDocument | null> {
    return this.deviceModel.findOne({ activateCode });
  }

  public async update(id: string, updateDeviceDto: UpdateDeviceDto) {
    return this.deviceModel.findByIdAndUpdate(id, updateDeviceDto, { new: true });
  }
}
