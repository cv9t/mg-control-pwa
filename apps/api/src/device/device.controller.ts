import { Controller, MessageEvent, Req, Res, Sse, UseGuards } from "@nestjs/common";
import { type Response } from "express";
import { Observable } from "rxjs";

import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { type AuthRequest } from "@/auth/interfaces/auth-request.interface";

import { DeviceService } from "./device.service";

@UseGuards(JwtAuthGuard)
@Controller("device")
export class DeviceController {
  public constructor(private readonly deviceService: DeviceService) {}

  @Sse("sensor-data")
  public sendSensorData(@Req() req: AuthRequest, @Res() res: Response): Observable<MessageEvent> {
    return this.deviceService.sendSensorData(res, req.user.deviceId);
  }
}
