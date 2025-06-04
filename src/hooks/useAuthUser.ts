// src/hooks/useRegisterUser.js
import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../api/userService";
import { toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import type {
  LoginUserData,
  RegisterResponse,
  RegisterUserData,
} from "@/types/user";
import { getTokenExpiry } from "@/lib/token";

const useRegisterUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (newUser: RegisterUserData) => registerUser(newUser),
    onSuccess: (data: RegisterResponse) => {
      // navigate to dashboard (use your router here)
      toaster.create({
        title: "Verification code sent",
        description: `We've sent a verification code to ${data.email}`,
        duration: 5000,
      });
      navigate("/verify");
    },
    onError: (error) => {
      // you can parse error.message or error.validationErrors
      console.error("Registration failed:", error);
      toaster.error({
        title: "Error",
        description: "Something went wrong. Please try again.",
        duration: 5000,
      });
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
    onError: (error) => {
      // you can parse error.message or error.validationErrors
      console.error("Login failed:", error);
      toaster.error({
        title: "Error",
        description: "Something went wrong. Please try again.",
        duration: 5000,
      });
    },
  });
};

export { useRegisterUser, useLoginUser };
