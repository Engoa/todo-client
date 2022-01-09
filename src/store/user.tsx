import React, { createContext, useContext } from "react";
import { IUser } from "../types/User";
import { useTodosContext } from "./todos";

export type UserContent = {
  user: IUser;
  isLoggedIn: boolean;
  setUser: (user: IUser) => void;
  logout: () => void;
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

export const UserProvider: React.FC = ({ children }): JSX.Element => {
  const [user, setUser] = React.useState<IUser>(getUserFromLS() || {});
  const { todos, setTodos } = useTodosContext();
  const isLoggedIn = !!user.email && !!user.accessToken;

  const setToLS = (data: Partial<IUser>) => {
    localStorage.setItem("user", JSON.stringify(data));
    return setUser(data);
  };

  const logout = () => {
    setUser({} as IUser);
    localStorage.removeItem("user");
    if (todos.length) setTodos([]);
  };

  return <UserContext.Provider value={{ user, setUser: setToLS, logout, isLoggedIn }}>{children}</UserContext.Provider>;
};
