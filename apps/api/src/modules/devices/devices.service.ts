import { Bind, Injectable, MessageEvent } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Response } from 'express';
import { Model } from 'mongoose';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Observable } from 'rxjs';

import { MqttService } from '@mg-control/api/modules/mqtt/mqtt.service';
import { SseService } from '@mg-control/api/modules/sse/sse.service';
import { DeviceDataDto } from '@mg-control/shared/dtos';
import { Nullable } from '@mg-control/shared/types';

import { UpdateDeviceDto } from './dtos/update-device.dto';
import { Device, DeviceDocument } from './schemas/device.schema';

const CONTROL_COMMANDS = { lightOn: 'light on', lightOff: 'light off' };

@Injectable()
export class DevicesService {
  public constructor(
    @InjectPinoLogger(DevicesService.name) private readonly logger: PinoLogger,
    @InjectModel(Device.name) private readonly deviceModel: Model<Device>,
    private readonly mqttService: MqttService,
    private readonly sseService: SseService,
  ) {}

  public sendData(res: Response, deviceId: string): Observable<MessageEvent> {
    const fullTopic = this._createFullTopicTopic(deviceId, 'data');
    this.mqttService.subscribe(fullTopic, (topic, message) => {
      const room = topic.split('/').pop() ?? '';
      if (room === 'data') {
        this._handleDataMessage(deviceId, message);
      }
    });

    this.logger.info(`Device ${deviceId} connected`);

    res.on('close', () => {
      this.mqttService.unsubscribe(fullTopic);
      this.sseService.disconnect(deviceId);
      this.logger.info(`Device ${deviceId} disconnected`);
    });

    return this.sseService.connect(deviceId);
  }

  public toggleLight(deviceId: string, state: 'on' | 'off'): void {
    const fullTopic = this._createFullTopicTopic(deviceId, 'control');
    const message = state === 'on' ? CONTROL_COMMANDS.lightOn : CONTROL_COMMANDS.lightOff;
    this.mqttService.publish(fullTopic, message);
  }

  @Bind()
  private _handleDataMessage(deviceId: string, message: string): void {
    if (this._isDataMessageValid(message)) {
      this.sseService.sendEvent(deviceId, {
        data: message,
      });
    } else {
      this.logger.error(`Invalid data message from device: ${deviceId}`);
    }
  }

  private _createFullTopicTopic(deviceId: string, topic: string): string {
    return `devices/${deviceId}/${topic}`;
  }

  private _isDataMessageValid(message: string): boolean {
    try {
      const data = plainToClass(DeviceDataDto, JSON.parse(message));
      const errors = validateSync(data);
      return errors.length === 0;
    } catch {
      return false;
    }
  }

  public async findById(id: string): Promise<Nullable<DeviceDocument>> {
    return this.deviceModel.findById(id);
  }

  public async findByActivationCode(activationCode: string): Promise<Nullable<DeviceDocument>> {
    return this.deviceModel.findOne({ activationCode });
  }

  public async update(id: string, updateDeviceDto: UpdateDeviceDto): Promise<Nullable<DeviceDocument>> {
    return this.deviceModel.findByIdAndUpdate(id, updateDeviceDto, { new: true });
  }
}
