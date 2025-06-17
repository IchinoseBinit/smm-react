import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getTokenExpiry, getUserFromToken } from "../token";
import { useRefreshToken } from "@/hooks/useAuthUser";
import { AuthContext } from "./authContext";
import type { JwtUser } from "@/types/user";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { mutate, isSuccess } = useRefreshToken();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<JwtUser | null>(null);

  useEffect(() => {
    const access_token = Cookies.get("access_token");
    const refresh_token = Cookies.get("refresh_token");

    if (!refresh_token) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    if (access_token && new Date() < getTokenExpiry(access_token)) {
      const user = getUserFromToken(access_token);
      setUser(user);
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
  }, [mutate, isSuccess]);
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
