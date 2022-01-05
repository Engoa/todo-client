export type IUser = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  accessToken?: string;
};
export type ISignup = {
  password?: string;
} & Partial<IUser>;
