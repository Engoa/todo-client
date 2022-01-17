import axios from "axios";
import { getUserFromLS } from "../store/user";

export const ApiService = (url: string) => {
  const instance = axios.create({ baseURL: `${import.meta.env.VITE_BASEURL}${url}` });

  instance.interceptors.request.use((request: any) => {
    const user = getUserFromLS();

    if (user) {
      request.headers.common.Authorization = `Bearer ${user.accessToken}`;
    }
    return request;
  });
  return instance;
};
