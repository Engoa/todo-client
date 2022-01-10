export type IUser = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  accessToken?: string;
  password?: string;
  _id?: any;
};
export type ISignup = {
  password?: string;
} & Partial<IUser>;
