import UserModel, { UserData } from "@/models/user.model";

class UserService {
  public async findUserById(id: string) {
    return UserModel.findById(id);
  }

  public async findUserByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  public async createUser(userData: UserData) {
    return UserModel.create(userData);
  }
}

const userService = new UserService();

export default userService;
