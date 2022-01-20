import { IUser } from "../types/User";
import { ApiService } from "./api.service";

export class UserService {
  static api = ApiService("");

  static getUserProfile(): Promise<IUser> {
    return this.api.get("/auth/me").then((res) => res.data);
  }
  static signup(user: IUser): Promise<IUser> {
    return this.api.post(`/auth/signup`, user).then((res) => res.data);
  }
  static login(user: IUser): Promise<IUser> {
    return this.api.post(`/auth/login`, user).then((res) => res.data);
  }
  static updateUser(userId: IUser, user: IUser): Promise<IUser> {
    return this.api.patch(`/users/${userId}`, user).then((res) => res.data);
  }
  static updateUserImage(userId: IUser, src: IUser): Promise<IUser> {
    return this.api.patch(`/users/${userId}`, src).then((res) => res.data);
  }
  static deleteUser(userId: IUser): Promise<IUser> {
    return this.api.delete(`/users/${userId}`).then((res) => res.data);
  }
}
