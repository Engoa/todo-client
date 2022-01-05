import axios from "axios";
import { getUserFromLS } from "../store/user";

export const ApiService = (url: string) => {
  const instance = axios.create({ baseURL: `${process.env.REACT_APP__BASE_URL}${url}` });

  instance.interceptors.request.use((request: any) => {
    const userData = getUserFromLS();
    const isLoggedIn = !!userData?.email && !!userData?.accessToken;

    if (isLoggedIn && userData) {
      request.headers.common.Authorization = `Bearer ${userData.accessToken}`;
    }
    return request;
  });
  return instance;
};
