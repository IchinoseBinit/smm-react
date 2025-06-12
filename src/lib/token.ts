// utils/token.ts
import { jwtDecode } from "jwt-decode";

export const getTokenExpiry = (token: string): Date => {
  const { exp } = jwtDecode<{ exp: number }>(token);
  return new Date(exp * 1000);
};
