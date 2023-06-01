import { BadRequestException, Bind, Injectable, MessageEvent } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Nullable } from "@mg-control/types";
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";
import { Response } from "express";
import { Model } from "mongoose";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Observable } from "rxjs";

import { MqttService } from "@/modules/mqtt/mqtt.service";
import { SseService } from "@/modules/sse/sse.service";

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
    const topic = `/devices/${deviceId}/sensor-data`;
    this.mqttService.subscribe(topic, this.handleSensorDataMessage(deviceId));
    this.logger.info(`Device ${deviceId} connected`);
    res.on("close", () => {
      this.mqttService.unsubscribe(topic);
      this.sseService.disconnect(deviceId);
      this.logger.info(`Device ${deviceId} disconnected`);
    });
    return this.sseService.connect(deviceId);
  }

  @Bind()
  private handleSensorDataMessage(deviceId: string) {
    return (topic: string, message: string): void => {
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

  private validateSensorDataMessage(message: string): void {
    const sensorData = plainToClass(SensorDataDto, JSON.parse(message));
    const errors = validateSync(sensorData);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
  }

  public async findByActivateCode(activateCode: string): Promise<Nullable<DeviceDocument>> {
    return this.deviceModel.findOne({ activateCode });
  }

  public async update(id: string, updateDeviceDto: UpdateDeviceDto): Promise<Nullable<DeviceDocument>> {
    return this.deviceModel.findByIdAndUpdate(id, updateDeviceDto, { new: true });
  }
}
