import axios from "axios";
import { getTokenFromLS } from "../store/user";

export const ApiService = (url: string) => {
  const instance = axios.create({ baseURL: `${import.meta.env.VITE_BASEURL}${url}` });

  instance.interceptors.request.use((request: any) => {
    const token = getTokenFromLS();
    const isLoggedIn = token !== null;

    if (token && isLoggedIn) {
      request.headers.common.Authorization = `Bearer ${token}`;
    }
    return request;
  });
  return instance;
};
