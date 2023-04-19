import { Response } from "express";

import UserDto from "@/dtos/user.dto";
import ApiError from "@/exceptions/api.error";
import { Bind } from "@/utils/class.utils";

import deviceService from "./device.service";

class SseService {
  private users: Map<string, Response>;

  public constructor() {
    this.users = new Map();
  }

  @Bind
  public async addUser(user: UserDto | undefined, res: Response) {
    if (!user) {
      throw ApiError.Unauthorized();
    }
    if (!user.deviceId) {
      throw ApiError.BadRequest(`У пользователя нет устройства`);
    }

    this.users.set(user.id, res);

    deviceService.subscribeToDevice(user.deviceId);

    res.on("close", () => {
      if (user.deviceId) {
        deviceService.unsubscribeFromDevice(user.deviceId);
      }
      this.removeUser(user.id);
      res.end();
    });
  }

  @Bind
  public removeUser(userId: string) {
    this.users.delete(userId);
  }

  @Bind
  public sendMessageToUser(userId: string, message: string) {
    const user = this.users.get(userId);
    if (user) {
      user.write(`data: ${message}\n\n`);
    }
  }
}

const sseService = new SseService();

export default sseService;
