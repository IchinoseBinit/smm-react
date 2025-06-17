import type { JwtUser } from "@/types/user";
import { createContext } from "react";

type AuthContextType = {
  user: JwtUser | null;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isLoading: boolean;
};
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
