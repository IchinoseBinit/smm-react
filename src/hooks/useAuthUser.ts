// src/hooks/useRegisterUser.js
import { useMutation } from "@tanstack/react-query";
import {
  changePassword,
  loginUser,
  refreshToken,
  registerUser,
  sendOtp,
  verifyOtp,
} from "../api/userService";
import { toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import type {
  changePsw,
  LoginUserData,
  RegisterResponse,
  RegisterUserData,
} from "@/types/user";
import { getTokenExpiry } from "@/lib/token";
import type { AxiosError } from "axios";

const useRegisterUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (newUser: RegisterUserData) => registerUser(newUser),
    onSuccess: (data: RegisterResponse) => {
      // navigate to dashboard (use your router here)
      navigate("/verify-otp");
      toaster.create({
        title: "Verification code sent",
        description: `We've sent a verification code to ${data.email}`,
        duration: 5000,
      });
    },
    onError: (error: { email: [string] }) => {
      // you can parse error.message or error.validationErrors
      console.error("Registration failed:", error.email);
      if (error.email[0] === "user with this email already exists.") {
        toaster.error({
          title: "User already exists",
          description: "Please try with a different email",
          duration: 5000,
        });
      } else {
        toaster.error({
          title: "Error",
          description: "Something went wrong. Please try again.",
          duration: 5000,
        });
      }
    },
  });
};

const useLoginUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (loginData: LoginUserData) => loginUser(loginData),
    onSuccess: (data) => {
      // navigate to dashboard (use your router here)
      const { access, refresh } = data;
      const access_exp = getTokenExpiry(access);
      const refresh_exp = getTokenExpiry(refresh);
      Cookies.set("access_token", access, {
        secure: true,
        sameSite: "Strict",
        expires: access_exp,
      });
      Cookies.set("refresh_token", refresh, {
        secure: true,
        sameSite: "Strict",
        expires: refresh_exp,
      });
      toaster.success({
        title: "Login successful",
        duration: 5000,
      });
      navigate("/");
    },

    onError: (error: {
      email?: string;
      password?: string[];
      message?: string;
    }) => {
      console.error("Login failed:", error);

      if (typeof error === "object") {
        if (error.email) {
          toaster.error({
            title: "Login Error",
            description: error.email,
          });
        } else if (Array.isArray(error.password)) {
          toaster.error({
            title: "Incorrect password",
            description: error.password[0],
          });
        } else if (error.message) {
          toaster.error({
            title: "Error",
            description: error.message,
          });
        }
      } else {
        toaster.error({
          title: "Unexpected Error",
          description: "Please try again",
        });
      }
    },
  });
};

const useRefreshToken = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (refresh_token: string) => refreshToken(refresh_token),
    onSuccess: (data) => {
      // navigate to dashboard (use your router here)
      const { access, refresh } = data;
      const access_exp = getTokenExpiry(access);
      const refresh_exp = getTokenExpiry(refresh);
      Cookies.set("access_token", access, {
        secure: true,
        sameSite: "Strict",
        expires: access_exp,
      });
      Cookies.set("refresh_token", refresh, {
        secure: true,
        sameSite: "Strict",
        expires: refresh_exp,
      });
      navigate("/");
    },
    onError: (error: AxiosError<{ code?: string; detail?: string }>) => {
      if (error?.response?.data?.code === "token_not_valid") {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        navigate("/login");
      }

      console.error("Refresh token failed:", error);
      toaster.error({
        title: "Error",
        description:
          error.response?.data?.detail ||
          "Something went wrong. Please try again.",
        duration: 5000,
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
      toaster.create({
        title: "Otp code sent",
        description: "please check your email",
        duration: 5000,
      });
    },
    onError: (error: { error: string }) => {
      // you can parse error.message or error.validationErrors
      console.error("Registration failed:", error.error);
      if (error.error === "User not found") {
        toaster.error({
          title: "User doesn't exists!",
          description: "Please try with a different email",
          duration: 5000,
        });
      } else {
        toaster.error({
          title: "Error",
          description: "Something went wrong. Please try again.",
          duration: 5000,
        });
      }
    },
  });
};

// verify otp
const useVerifyOtp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (d: { email: string; otp: string }) => verifyOtp(d),
    onSuccess: () => {
      // navigate to dashboard (use your router here)
      navigate("/login");
      toaster.success({
        title: "Email verified!",
        description: "Your account has been successfully created",
        duration: 5000,
      });
    },
    onError: (error) => {
      // you can parse error.message or error.validationErrors
      console.error("otp sent failed:", error);
      toaster.error({
        title: "Error",
        description: "Something went wrong. Please try again.",
        duration: 5000,
      });
    },
  });
};
//change password
const useChangePassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (d: changePsw) => changePassword(d),
    onSuccess: () => {
      toaster.success({
        title: "Success",
        description: "Password changed successfully",
        duration: 5000,
      });
      navigate("/login");
    },
    onError: (error: { error: string }) => {
      // you can parse error.message or error.validationErrors
      console.error("password changed failed:", error);
      if (error.error === "Invalid email or OTP") {
        toaster.error({
          title: "Invalid email or OTP",
          description: "Please try again",
          duration: 5000,
        });
      } else {
        toaster.error({
          title: "Error",
          description: "Something went wrong. Please try again.",
          duration: 5000,
        });
      }
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
