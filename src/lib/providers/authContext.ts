import { createContext } from "react";

type AuthContextType = {
  user: null;
  isAuthenticated: boolean;
  isLoading: boolean;
};
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
