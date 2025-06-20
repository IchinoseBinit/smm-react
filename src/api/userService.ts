import { API_ROUTES } from "@/lib/constants/apiRoutes";
import axiosInstance from "./axiosConfig";
import type { AxiosError } from "axios";

const connectedFbAcc = async (user_id: string) => {
  try {
    const { data } = await axiosInstance.get(
      `${API_ROUTES.CONNECT_ACC.FACEBOOK.ACCOUNT}${user_id}/`,
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<{ error: string }>;
    const message = error.response?.data?.error || error.message;
    throw new Error(message);
  }
};

const connectedFbAccPages = async (user_id: string) => {
  try {
    const { data } = await axiosInstance.get(
      `${API_ROUTES.CONNECT_ACC.FACEBOOK.PAGES}${user_id}/`,
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<{ error: string }>;
    const message = error.response?.data?.error || error.message;
    throw new Error(message);
  }
};

export { connectedFbAccPages, connectedFbAcc };
