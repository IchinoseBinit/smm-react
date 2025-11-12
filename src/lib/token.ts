// utils/token.ts
import type { JwtUser } from "@/types/user";
import { jwtDecode } from "jwt-decode";

export const getUserFromToken = (token: string): JwtUser => {
  const data = jwtDecode<JwtUser>(token);
  const user = {
    user_id: data.user_id,
    email: data.email,
    full_name: data.full_name,
    mobile: data.mobile,
    role: data.role,
  };
  return user;
};
export const getTokenExpiry = (token: string): Date => {
  const { exp } = jwtDecode<{ exp: number }>(token);
  return new Date(exp * 1000);
};
