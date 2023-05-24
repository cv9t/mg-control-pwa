import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { MqttModule } from "@/modules/mqtt/mqtt.module";
import { SseModule } from "@/modules/sse/sse.module";

import { Device, DeviceSchema } from "./schemas/device.schema";
import { DeviceController } from "./device.controller";
import { DeviceService } from "./device.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]), MqttModule, SseModule],
  controllers: [DeviceController],
  providers: [DeviceService],
  exports: [DeviceService],
})
export class DeviceModule {}
