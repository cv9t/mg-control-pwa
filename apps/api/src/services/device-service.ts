import { DeviceSensorData } from "@mg-control/types";

import ValidationError from "@/exceptions/validation-error";
import DeviceModel, { DeviceData } from "@/models/device-model";
import { Bind } from "@/utils/class-utils";
import { validateDeviceSensorData } from "@/validators/device-validator";

import mqttService from "./mqtt-service";
import sseService from "./sse-service";

class DeviceService {
  public subscribeToDevice(userId: string, deviceId: string) {
    mqttService.subscribe(`/devices/${deviceId}/#`, this.handleMqttMessage(userId, deviceId));
  }

  public unsubscribeFromDevice(deviceId: string) {
    mqttService.unsubscribe(`/devices/${deviceId}/#`);
  }

  @Bind
  private handleMqttMessage(userId: string, deviceId: string) {
    return (topic: string, message: string) => {
      try {
        const room = topic.split("/").pop() ?? "";
        if (room === "sensor-data") {
          this.handleSensorDataTopicMessage(userId, message);
        }
      } catch (error) {
        if (error instanceof ValidationError) {
          console.log(`Ошибка при валидации данных от ${deviceId}: ${error.message}`);
        }
        console.log(error);
      }
    };
  }

  private handleSensorDataTopicMessage(userId: string, message: string) {
    const sensorData: DeviceSensorData = JSON.parse(message);
    const { error } = validateDeviceSensorData(sensorData);
    if (error) {
      throw new ValidationError(error.message);
    }
    sseService.sendMessageToUser(userId, JSON.stringify(sensorData));
  }

  public async findDeviceByActivateCode(activateCode: string) {
    return DeviceModel.findOne({ activateCode });
  }

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
