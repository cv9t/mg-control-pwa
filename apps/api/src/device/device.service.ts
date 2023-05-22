import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { BadRequestException, Bind, Injectable, MessageEvent } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";
import { Response } from "express";
import { Model } from "mongoose";
import { Observable } from "rxjs";

import { MqttService } from "@/mqtt/mqtt.service";
import { SseService } from "@/sse/sse.service";

import { SensorDataDto } from "./dtos/sensor-data.dto";
import { UpdateDeviceDto } from "./dtos/update-device.dto";
import { Device, DeviceDocument } from "./schemas/device.schema";

@Injectable()
export class DeviceService {
  public constructor(
    @InjectPinoLogger(DeviceService.name) private readonly logger: PinoLogger,
    @InjectModel(Device.name) private readonly deviceModel: Model<Device>,
    private readonly mqttService: MqttService,
    private readonly sseService: SseService
  ) {}

  public sendSensorData(res: Response, deviceId: string): Observable<MessageEvent> {
    res.on("close", () => {
      this.sseService.disconnect(deviceId);
      this.logger.info(`Device ${deviceId} disconnected`);
    });
    this.mqttService.subscribe(`/devices/${deviceId}/sensor-data`, this.handleSensorDataMessage(deviceId));
    this.logger.info(`Device ${deviceId} connected`);
    return this.sseService.connect(deviceId);
  }

  @Bind()
  private handleSensorDataMessage(deviceId: string) {
    return (topic: string, message: string) => {
      try {
        const room = topic.split("/").pop() ?? "";
        if (room === "sensor-data") {
          this.validateSensorDataMessage(message);
          this.sseService.sendEvent(deviceId, {
            data: message,
          });
        }
      } catch (err) {
        this.logger.error(`Failed to process sensor data message from device ${deviceId}: ${err}`);
      }
    };
  }

  private validateSensorDataMessage(message: string) {
    const sensorData = plainToClass(SensorDataDto, JSON.parse(message));
    const errors = validateSync(sensorData);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
  }

  public async findByActivateCode(activateCode: string): Promise<DeviceDocument | null> {
    return this.deviceModel.findOne({ activateCode });
  }

  public async update(id: string, updateDeviceDto: UpdateDeviceDto): Promise<DeviceDocument | null> {
    return this.deviceModel.findByIdAndUpdate(id, updateDeviceDto, { new: true });
  }
}
