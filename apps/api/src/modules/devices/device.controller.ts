import { Controller, MessageEvent, Post, Query, Res, Sse, UseGuards } from '@nestjs/common';

import { type Response } from 'express';
import { Observable } from 'rxjs';

import { User } from '@mg-control/api/modules/auth/decorators/user.decorator';
import { JwtAuthGuard } from '@mg-control/api/modules/auth/guards/jwt-auth.guard';

import { DevicesService } from './devices.service';

@UseGuards(JwtAuthGuard)
@Controller('device')
export class DeviceController {
  public constructor(private readonly devicesService: DevicesService) {}

  @Sse('data')
  public sendData(@User('deviceId') deviceId: string, @Res() res: Response): Observable<MessageEvent> {
    return this.devicesService.sendData(res, deviceId);
  }

  @Post('toggle-light')
  public toggleLight(@Query('state') state: 'on' | 'off', @User('deviceId') deviceId: string): void {
    this.devicesService.toggleLight(deviceId, state);
  }
}
