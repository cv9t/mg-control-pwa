import { Response } from "express";

import UserDto from "@/dtos/user-dto";
import ApiError from "@/exceptions/api-error";

import deviceService from "./device-service";

class SseService {
  private users: Map<string, Response>;

  public constructor() {
    this.users = new Map();
  }

  public async addUser(user: UserDto | undefined, res: Response) {
    if (!user || !user.deviceId) {
      throw ApiError.Unauthorized();
    }

    this.users.set(user.id, res);
    deviceService.subscribeToDevice(user.id, user.deviceId);

    res.on("close", () => {
      if (user.deviceId) {
        deviceService.unsubscribeFromDevice(user.deviceId);
      }
      this.removeUser(user.id);
      res.end();
    });
  }

  public removeUser(userId: string) {
    this.users.delete(userId);
  }

  public sendMessageToUser(userId: string, message: string) {
    const user = this.users.get(userId);
    if (user) {
      user.write(`data: ${message}\n\n`);
    }
  }
}

const sseService = new SseService();

export default sseService;
