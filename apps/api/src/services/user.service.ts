import UserModel, { UserData } from "@/models/user.model";
import { Bind } from "@/utils/class.utils";

class UserService {
  @Bind
  public async findUserById(id: string) {
    return UserModel.findById(id);
  }

  @Bind
  public async findUserByDeviceId(deviceId: string) {
    return UserModel.findOne({ device: deviceId });
  }

  @Bind
  public async findUserByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  @Bind
  public async createUser(userData: UserData) {
    return UserModel.create(userData);
  }
}

const userService = new UserService();

export default userService;
