import { Request, Response } from "express";

import config from "@/config";
import MqttService, { MqttServiceOptions } from "@/services/mqtt.service";
import { routeHandler } from "@/utils/error.utils";

const mqttOptions: MqttServiceOptions = {
  brokerUrl: config.MQTT_BROKER_URL,
  primaryTopic: "/isu/mg-control/devices",
};

class DeviceController {
  private mqttService: MqttService;

  public constructor() {
    this.mqttService = new MqttService("Device", mqttOptions);

    this.subscribeToDevice = this.subscribeToDevice.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  @routeHandler
  public subscribeToDevice(req: Request, res: Response) {
    const { deviceId } = req.params;
    this.mqttService.subscribe(deviceId, this.handleMessage(deviceId));
    res.status(200).json({ connected: true });
  }

  private handleMessage(deviceId: string) {
    return (message: string) => {
      console.log(deviceId, message);
    };
  }
}

const deviceController = new DeviceController();

export default deviceController;
