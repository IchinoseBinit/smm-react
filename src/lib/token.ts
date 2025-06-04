// utils/token.ts
import { jwtDecode } from "jwt-decode";

export const getTokenExpiry = (token: string) => {
  const decoded: { exp: number } = jwtDecode(token);
  return decoded.exp;
};
