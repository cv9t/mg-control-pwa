import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Device, DeviceSchema } from "./schemas/device.schema";
import { DeviceService } from "./device.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }])],
  providers: [DeviceService],
})
export class DeviceModule {}
