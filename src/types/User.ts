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
  isLoggedIn: boolean;
  setUser: (user: IUser) => void;
  logout: () => void;
};
