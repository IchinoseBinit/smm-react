import { createContext } from "react";

type AuthContextType = {
  user: null;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isLoading: boolean;
};
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
