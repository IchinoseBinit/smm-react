// src/api/userService.ts
import type { AxiosError } from "axios";
import type {
  changePsw,
  LoginResponse,
  LoginUserData,
  RegisterResponse,
  RegisterUserData,
} from "@/types/auth";
import { API_ROUTES } from "@/lib/constants/apiRoutes";
import axiosInstance from "./axiosConfig";

const registerUser = async (
  userData: RegisterUserData,
): Promise<RegisterResponse> => {
  try {
    const { data } = await axiosInstance.post<RegisterResponse>(
      API_ROUTES.AUTH.REGISTER,
      userData,
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<{ error: string }>;
    const message = error.response?.data?.error || error.message;
    throw new Error(message);
  }
};

const loginUser = async (userData: LoginUserData): Promise<LoginResponse> => {
  try {
    const { data } = await axiosInstance.post<LoginResponse>(
      API_ROUTES.AUTH.LOGIN,
      userData,
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<{ error: string }>;
    const message = error.response?.data?.error || error.message;
    throw new Error(message);
  }
};

const refreshToken = async (refreshToken: string): Promise<LoginResponse> => {
  try {
    const { data } = await axiosInstance.post<LoginResponse>(
      API_ROUTES.AUTH.REFRESH_TOKEN,
      { refresh: refreshToken },
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<{ error: string }>;
    const message = error.response?.data?.error || error.message;
    throw new Error(message);
  }
};
// send otp

const sendOtp = async (email: string) => {
  try {
    const { data } = await axiosInstance.post(API_ROUTES.AUTH.SEND_OTP, {
      email,
    });
    return data;
  } catch (err) {
    const error = err as AxiosError<{ error: string }>;
    const message = error.response?.data?.error || error.message;
    throw new Error(message);
  }
};

type otpProps = {
  email: string;
  otp: string;
};
//verify otp
const verifyOtp = async (d: otpProps) => {
  try {
    const { data } = await axiosInstance.post(API_ROUTES.AUTH.UPDATE_PSW, {
      email: d.email,
      otp: d.otp.split(",").join(""),
    });
    return data;
  } catch (err) {
    const error = err as AxiosError<{ error: string }>;
    const message = error.response?.data?.error || error.message;
    throw new Error(message);
  }
};

// update password
const changePassword = async (Data: changePsw) => {
  try {
    const { data } = await axiosInstance.post(API_ROUTES.AUTH.UPDATE_PSW, Data);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ error: string }>;
    const message = error.response?.data?.error || error.message;
    throw new Error(message);
  }
};

export {
  registerUser,
  loginUser,
  refreshToken,
  sendOtp,
  verifyOtp,
  changePassword,
};
