import { IUser } from "@/models/user-model";

class UserDto {
  public id: string;

  public email: string;

  public isActivated: boolean;

  public constructor(model: IUser) {
    this.id = model._id;
    this.email = model.email;
    this.isActivated = model.isActivated;
  }
}

export default UserDto;
