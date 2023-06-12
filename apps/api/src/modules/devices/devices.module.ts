import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MqttModule } from '@mg-control/api/modules/mqtt/mqtt.module';
import { SseModule } from '@mg-control/api/modules/sse/sse.module';

import { Device, DeviceSchema } from './schemas/device.schema';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
    MqttModule,
    SseModule,
  ],
  controllers: [DevicesController],
  providers: [DevicesService],
  exports: [DevicesService],
})
export class DevicesModule {}
