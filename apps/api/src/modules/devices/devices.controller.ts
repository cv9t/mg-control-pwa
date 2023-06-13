import { Controller, MessageEvent, Res, Sse, UseGuards } from '@nestjs/common';

import { type Response } from 'express';
import { Observable } from 'rxjs';

import { User } from '@mg-control/api/modules/auth/decorators/user.decorator';
import { JwtAuthGuard } from '@mg-control/api/modules/auth/guards/jwt-auth.guard';

import { DevicesService } from './devices.service';

@UseGuards(JwtAuthGuard)
@Controller('device')
export class DevicesController {
  public constructor(private readonly devicesService: DevicesService) {}

  @Sse('sensor-data')
  public sendSensorData(
    @User('deviceId') deviceId: string,
    @Res() res: Response,
  ): Observable<MessageEvent> {
    return this.devicesService.sendSensorData(res, deviceId);
  }
}
