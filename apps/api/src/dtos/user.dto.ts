import { IUser } from "@/models/user.model";

class UserDto {
  public id: string;

  public email: string;

  public deviceId: string | undefined;

  public constructor(model: IUser) {
    this.id = model._id;
    this.email = model.email;
    this.deviceId = model.device;
  }
}

export default UserDto;
