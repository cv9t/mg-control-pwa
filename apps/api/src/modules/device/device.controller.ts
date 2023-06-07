import { Controller, MessageEvent, Res, Sse, UseGuards } from '@nestjs/common';

import { type Response } from 'express';
import { Observable } from 'rxjs';

import { User } from '@mg-control/api/modules/auth/decorators/user.decorator';
import { JwtAuthGuard } from '@mg-control/api/modules/auth/guards/jwt-auth.guard';

import { DeviceService } from './device.service';

@UseGuards(JwtAuthGuard)
@Controller('device')
export class DeviceController {
  public constructor(private readonly deviceService: DeviceService) {}

  @Sse('sensor-data')
  public sendSensorData(
    @User('deviceId') deviceId: string,
    @Res() res: Response,
  ): Observable<MessageEvent> {
    return this.deviceService.sendSensorData(res, deviceId);
  }
}
