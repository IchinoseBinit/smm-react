// src/api/userService.ts
import type { AxiosError } from "axios";
import axios from "./axiosConfig";
import type {
  LoginResponse,
  LoginUserData,
  RegisterResponse,
  RegisterUserData,
} from "@/types/user";
import { API_ROUTES } from "@/constants/apiRoutes";

const registerUser = async (
  userData: RegisterUserData,
): Promise<RegisterResponse> => {
  try {
    const { data } = await axios.post<RegisterResponse>(
      API_ROUTES.AUTH.REGISTER,
      userData,
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw error.response?.data || { message: error.message };
  }
};

const loginUser = async (userData: LoginUserData): Promise<LoginResponse> => {
  try {
    const { data } = await axios.post<LoginResponse>(
      API_ROUTES.AUTH.LOGIN,
      userData,
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw error.response?.data || { message: error.message };
  }
};

export { registerUser, loginUser };
