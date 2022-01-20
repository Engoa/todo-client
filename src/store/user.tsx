import { Axios, AxiosError } from "axios";
import React, { createContext, useContext } from "react";
import { UserService } from "../services/user.service";
import { IUser, UserContent } from "../types/User";
import { useLoaderContext } from "./loader";
import { useTodosContext } from "./todos";
import merge from "lodash/merge";
import { useSnackBarContext } from "./snackbar";

export const UserContext = createContext<UserContent>({} as UserContent);
export const useUserContext = () => useContext(UserContext);

export const getUserFromLS = (): IUser => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const UserProvider: React.FC = ({ children }): JSX.Element => {
  const [user, setUser] = React.useState<IUser>(getUserFromLS());
  const { todos, setTodos, resetSearch } = useTodosContext();
  const { setLoading } = useLoaderContext();
  const { toggleSnackBar } = useSnackBarContext();

  const isLoggedIn: boolean = !!localStorage.getItem("user");

  const fetchUser = async () => {
    if (!isLoggedIn) return;
    try {
      setLoading(true);
      const res = await UserService.getUserProfile();
      mergeUser(res);
    } catch (error) {
      logout();
      toggleSnackBar("An error occured, please try again later");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const setToLS = (user: IUser) => {
    if ((user as AxiosError).code) return;
    localStorage.setItem("user", JSON.stringify(user));
  };

  const mergeUser = (data: IUser) => {
    const merged = merge(user, data);
    setUser(merged);
    setToLS(merged);
  };

  const saveUser = (data: IUser) => {
    setUser(data);
    setToLS(data);
  };

  const logout = () => {
    setUser({} as IUser);
    localStorage.removeItem("user");
    if (todos.length) {
      setTodos([]);
      resetSearch();
    }
  };

  return <UserContext.Provider value={{ user, fetchUser, logout, isLoggedIn, saveUser, mergeUser }}>{children}</UserContext.Provider>;
};
