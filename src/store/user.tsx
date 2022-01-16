import React, { createContext, useContext } from "react";
import { UserService } from "../services/user.service";
import { IUser, UserContent } from "../types/User";
import { useTodosContext } from "./todos";

export const UserContext = createContext<UserContent>({} as UserContent);
export const useUserContext = () => useContext(UserContext);

export const getTokenFromLS = (): IUser => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    return JSON.parse(token);
  }
  return {} as IUser;
};

export const UserProvider: React.FC = ({ children }): JSX.Element => {
  const [user, setUser] = React.useState<IUser>(getTokenFromLS() || {});
  const { todos, setTodos } = useTodosContext();
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const fetchUser = async () => {
    if (!isLoggedIn) return;
    try {
      const res = await UserService.getUserProfile();
      setUser(res);
    } catch (error) {
      console.log(error);
    }
  };

  const setToLS = (data: IUser) => {
    localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
    setUser(data);
  };

  const logout = () => {
    setUser({} as IUser);
    localStorage.removeItem("accessToken");
    if (todos.length) setTodos([]);
  };

  return <UserContext.Provider value={{ user, fetchUser, logout, isLoggedIn, setUser, setToLS }}>{children}</UserContext.Provider>;
};
