import axios from "axios";
import { getUserFromLS } from "../store/user";

export const ApiService = (url: string) => {
  const instance = axios.create({ baseURL: `${import.meta.env.VITE_BASEURL}${url}` });

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
