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
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useRefreshToken();

  const recheckAuth = useCallback(() => {
    setIsLoading(true);
    const access_token = Cookies.get("access_token");
    const refresh_token = Cookies.get("refresh_token");

    if (!refresh_token) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    if (access_token && Date.now() < getTokenExpiry(access_token) * 1000) {
      setIsAuthenticated(true);
      setIsLoading(false);
      return;
    }

    mutate(refresh_token, {
      onSuccess: () => {
        setIsAuthenticated(true);
        setIsLoading(false);
      },
      onError: () => {
        setIsAuthenticated(false);
        setIsLoading(false);
      },
    });
  }, [mutate]);

  useEffect(() => {
    recheckAuth();
  }, [recheckAuth]);

  return (
    <AuthContext.Provider
      value={{ user: null, isAuthenticated, recheckAuth, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
