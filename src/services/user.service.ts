import { IUser } from "../types/User";
import { ApiService } from "./api.service";

export class UserService {
  static api = ApiService("");

  static signup(user: IUser): Promise<IUser> {
    return this.api.post(`/auth/signup`, user).then((res) => res.data);
  }

  static login(user: IUser): Promise<IUser> {
    return this.api.post(`/auth/login`, user).then((res) => res.data);
  }

  static updateUser(userId: IUser, user: IUser): Promise<IUser> {
    return this.api.patch(`/users/${userId}`, user).then((res) => res.data);
  }
}
