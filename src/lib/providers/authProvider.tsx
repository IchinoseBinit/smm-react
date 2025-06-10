// AuthContext.tsx
import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getTokenExpiry } from "../token";
import { useRefreshToken } from "@/hooks/useAuthUser";
import { AuthContext } from "./authContext";

interface Props {
  children: React.ReactNode;
}
export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { mutate } = useRefreshToken();
  const recheckAuth = useCallback(() => {
    const access_token = Cookies.get("access_token");
    const refresh_token = Cookies.get("refresh_token");

    if (!access_token || !refresh_token) {
      setIsAuthenticated(false);
      return;
    }
    const access_exp = getTokenExpiry(access_token);
    if (Date.now() < access_exp * 1000) {
      setIsAuthenticated(true);
    } else {
      mutate(refresh_token);
    }
  }, [mutate]);

  useEffect(() => {
    recheckAuth();
  }, [recheckAuth]);

  return (
    <AuthContext.Provider value={{ user: null, isAuthenticated, recheckAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
