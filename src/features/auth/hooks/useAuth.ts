import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getTokenExpiry } from "@/lib/token";
import {
  changePassword,
  loginUser,
  refreshToken,
  registerUser,
  sendOtp,
  verifyOtp,
} from "../api";
import { handleError, handleSuccess } from "../lib/utils";
import { setAuthCookies } from "../lib/cookies";

const useRegisterUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => navigate("/verify-otp"),
    onError: (error: Error) => handleError("Registration failed", error),
  });
};

const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const { access, refresh } = data;
      setAuthCookies(access, refresh, getTokenExpiry);
      handleSuccess("Login successful", "");
    },
    onError: (error: Error) => handleError("Login failed", error),
  });
};

const useRefreshToken = () => {
  return useMutation({
    mutationFn: refreshToken,
    onSuccess: (data) => {
      const { access, refresh } = data;
      setAuthCookies(access, refresh, getTokenExpiry);
    },
    onError: (error: Error) => handleError("Refresh token failed", error),
  });
};

const useSendOtp = () => {
  return useMutation({
    mutationFn: sendOtp,
    onSuccess: () => handleSuccess("Otp code sent", "Please check your email"),
    onError: (error: Error) => handleError("Send Otp failed", error),
  });
};

const useVerifyOtp = () => {
  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: () =>
      handleSuccess(
        "Email verified!",
        "Your account has been successfully created",
      ),
    onError: (error: Error) => handleError("Verify Otp failed", error),
  });
};

const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => handleSuccess("Success", "Password changed successfully"),
    onError: (error: Error) => handleError("Change password failed", error),
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
