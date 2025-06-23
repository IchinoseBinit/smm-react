import type {
  changePsw,
  LoginResponse,
  LoginUserData,
  RegisterResponse,
  RegisterUserData,
} from "./auth.types";
import { API_ROUTES } from "@/lib/constants/apiRoutes";
import axiosInstance from "@/services/axios";
import { safeApiCall } from "@/lib/helper/apiHelper";

const registerUser = (userData: RegisterUserData): Promise<RegisterResponse> =>
  safeApiCall(() =>
    axiosInstance
      .post<RegisterResponse>(API_ROUTES.AUTH.REGISTER, userData)
      .then((res) => res.data),
  );

const loginUser = (userData: LoginUserData): Promise<LoginResponse> =>
  safeApiCall(() =>
    axiosInstance
      .post<LoginResponse>(API_ROUTES.AUTH.LOGIN, userData)
      .then((res) => res.data),
  );

const refreshToken = (refreshToken: string): Promise<LoginResponse> =>
  safeApiCall(() =>
    axiosInstance
      .post<LoginResponse>(API_ROUTES.AUTH.REFRESH_TOKEN, {
        refresh: refreshToken,
      })
      .then((res) => res.data),
  );

const sendOtp = (email: string) =>
  safeApiCall(() =>
    axiosInstance
      .post(API_ROUTES.AUTH.SEND_OTP, { email })
      .then((res) => res.data),
  );

type otpProps = {
  email: string;
  otp: string;
};

const verifyOtp = (d: otpProps) =>
  safeApiCall(() =>
    axiosInstance
      .post(API_ROUTES.AUTH.UPDATE_PSW, {
        email: d.email,
        otp: d.otp.split(",").join(""),
      })
      .then((res) => res.data),
  );

const changePassword = (Data: changePsw) =>
  safeApiCall(() =>
    axiosInstance
      .post(API_ROUTES.AUTH.UPDATE_PSW, Data)
      .then((res) => res.data),
  );

export {
  registerUser,
  loginUser,
  refreshToken,
  sendOtp,
  verifyOtp,
  changePassword,
};
