import { DeviceSensorData } from "@mg-control/types";

import ValidationError from "@/exceptions/validation.error";
import DeviceModel, { DeviceData } from "@/models/device.model";
import { Bind } from "@/utils/class.utils";
import { validateDeviceSensorData } from "@/validators/device.validator";

import mqttService from "./mqtt.service";
import sseService from "./sse.service";
import userService from "./user.service";

class DeviceService {
  @Bind
  public subscribeToDevice(deviceId: string) {
    mqttService.subscribe(`/devices/${deviceId}/#`, this.handleMqttMessage(deviceId));
  }

  @Bind
  public unsubscribeFromDevice(deviceId: string) {
    mqttService.unsubscribe(`/devices/${deviceId}/#`);
  }

  @Bind
  private handleMqttMessage(deviceId: string) {
    return async (topic: string, message: string) => {
      try {
        const room = topic.split("/").pop() ?? "";
        if (room === "sensorData") {
          await this.handleSensorDataTopicMessage(deviceId, message);
        }
      } catch (err) {
        if (err instanceof ValidationError) {
          console.log(`Ошибка при валидации данных от ${deviceId}: ${err.message}`);
        }
        console.log(err);
      }
    };
  }

  @Bind
  private async handleSensorDataTopicMessage(deviceId: string, message: string) {
    const sensorData: DeviceSensorData = JSON.parse(message);
    const { error } = validateDeviceSensorData(sensorData);
    if (error) {
      throw new ValidationError(error.message);
    }

    const user = await userService.findUserByDeviceId(deviceId);
    if (user) {
      sseService.sendMessageToUser(user.id, JSON.stringify(sensorData));
    }
  }

  @Bind
  public async findDeviceByActivateCode(activateCode: string) {
    return DeviceModel.findOne({ activateCode });
  }

  @Bind
  public async updateDevice(id: string, data: Partial<DeviceData>) {
    const device = await DeviceModel.findById(id);
    if (!device) {
      return null;
    }
    Object.assign(device, data);
    return device.save();
  }
}

const deviceService = new DeviceService();

export default deviceService;
