export type IUser = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  accessToken?: string;
  password?: string;
  _id?: any;
  avatar?: string;
};
export type ISignup = {
  password?: string;
} & Partial<IUser>;

export type UserContent = {
  user: IUser;
  isLoggedIn: {} | IUser;
  isUserInit: boolean;
  fetchUser: () => void;
  logout: () => void;
  mergeUser: (user: IUser) => void;
  saveUser: (user: IUser) => void;
};
