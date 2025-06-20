// src/hooks/useRegisterUser.js
import { useMutation } from "@tanstack/react-query";
import {
  changePassword,
  loginUser,
  refreshToken,
  registerUser,
  sendOtp,
  verifyOtp,
} from "../api/authService";
import { toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import type { changePsw, LoginUserData, RegisterUserData } from "@/types/auth";
import { getTokenExpiry } from "@/lib/token";

const isProd = window.location.hostname !== "localhost";
const useRegisterUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (newUser: RegisterUserData) => registerUser(newUser),
    onSuccess: () => {
      // navigate to dashboard (use your router here)
      navigate("/verify-otp");
    },
    onError: (error: Error) => {
      console.log(error);
      toaster.error({
        title: "Login failed",
        description: error.message,
      });
    },
  });
};

const useLoginUser = () => {
  return useMutation({
    mutationFn: (loginData: LoginUserData) => loginUser(loginData),
    onSuccess: (data) => {
      // navigate to dashboard (use your router here)
      const { access, refresh } = data;

      const access_exp = getTokenExpiry(access);
      const refresh_exp = getTokenExpiry(refresh);

      Cookies.set("access_token", access, {
        expires: access_exp,
        secure: isProd,
        sameSite: isProd ? "None" : "Lax",
      });
      Cookies.set("refresh_token", refresh, {
        expires: refresh_exp,
        secure: isProd,
        sameSite: isProd ? "None" : "Lax",
      });
      toaster.success({
        title: "Login successful",
        duration: 2000,
        closable: true,
      });
    },
    onError: (error: Error) => {
      console.log(error);
      toaster.error({
        title: "Login failed",
        description: error.message,
        closable: true,
      });
    },
  });
};

const useRefreshToken = () => {
  return useMutation({
    mutationFn: (refresh_token: string) => refreshToken(refresh_token),
    onSuccess: (data) => {
      // navigate to dashboard (use your router here)
      const { access, refresh } = data;
      const access_exp = getTokenExpiry(access);
      const refresh_exp = getTokenExpiry(refresh);
      Cookies.set("access_token", access, {
        expires: access_exp,
        secure: isProd,
        sameSite: isProd ? "None" : "Lax",
      });
      Cookies.set("refresh_token", refresh, {
        expires: refresh_exp,
        secure: isProd,
        sameSite: isProd ? "None" : "Lax",
      });
    },

    onError: (error: Error) => {
      console.log(error);
      toaster.error({
        title: "Refresh token failed",
        description: error.message,
      });
    },
  });
};

// send otp
const useSendOtp = () => {
  return useMutation({
    mutationFn: (email: string) => sendOtp(email),
    onSuccess: () => {
      // navigate to dashboard (use your router here)
      toaster.success({
        title: "Otp code sent",
        description: "please check your email",
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      console.log(error);
      toaster.error({
        title: "Send Otp failed",
        description: error.message,
      });
    },
  });
};

// verify otp
const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (d: { email: string; otp: string }) => verifyOtp(d),
    onSuccess: () => {
      // navigate to dashboard (use your router here)
      toaster.success({
        title: "Email verified!",
        description: "Your account has been successfully created",
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      console.log(error);
      toaster.error({
        title: "Verify Otp failed",
        description: error.message,
      });
    },
  });
};
//change password
const useChangePassword = () => {
  return useMutation({
    mutationFn: (d: changePsw) => changePassword(d),
    onSuccess: () => {
      toaster.success({
        title: "Success",
        description: "Password changed successfully",
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      console.log(error);
      toaster.error({
        title: "change password failed",
        description: error.message,
      });
    },
  });
};

export {
  useRegisterUser,
  useLoginUser,
  useRefreshToken,
  useSendOtp,
  useVerifyOtp,
  useChangePassword,
};
