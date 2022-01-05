import axios from "axios";
import { getUserFromLS } from "../store/user";

export const ApiService = (url: string) => {
  const instance = axios.create({ baseURL: `http://localhost:4000/${url}` });

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
