import React, { createContext, useContext } from "react";
import { IUser } from "../types/User";

export type UserContent = {
  user: IUser;
  isLoggedIn: boolean;
  setUser: (user: IUser) => void;
};

export const UserContext = createContext<UserContent>({} as UserContent);
export const useUserContext = () => useContext(UserContext);

export const getUserFromLS = (): IUser => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return {} as IUser;
};

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<IUser>(getUserFromLS() || {});
  const isLoggedIn = !!user.email && !!user.accessToken;

  const setToLS = (data: Partial<IUser>) => {
    localStorage.setItem("user", JSON.stringify(data));
    return setUser(data);
  };

  return <UserContext.Provider value={{ user, setUser: setToLS, isLoggedIn }}>{children}</UserContext.Provider>;
};
